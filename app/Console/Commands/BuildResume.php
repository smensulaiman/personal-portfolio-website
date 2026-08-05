<?php

namespace App\Console\Commands;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\SkillCategory;
use Illuminate\Console\Command;
use ZipArchive;

/**
 * Builds the downloadable .docx resume from the same records that drive the
 * public portfolio, so the two can never drift apart.
 *
 * A .docx is a zip of XML parts. Rather than pull in a Word library for one
 * document, this writes the four parts a reader needs directly.
 */
class BuildResume extends Command
{
    protected $signature = 'resume:build {--path= : Where to write the .docx}';

    protected $description = 'Generate the downloadable resume from the portfolio content';

    /**
     * External hyperlink targets, keyed by relationship id.
     *
     * @var array<string, string>
     */
    private array $links = [];

    public function handle(): int
    {
        $path = $this->option('path') ?: public_path('Resume_of_Sulaiman.docx');

        $body = $this->buildBody();

        $zip = new ZipArchive;

        if ($zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            $this->error("Unable to write {$path}");

            return self::FAILURE;
        }

        $zip->addFromString('[Content_Types].xml', $this->contentTypes());
        $zip->addFromString('_rels/.rels', $this->packageRels());
        $zip->addFromString('word/styles.xml', $this->styles());
        $zip->addFromString('word/_rels/document.xml.rels', $this->documentRels());
        $zip->addFromString('word/document.xml', $this->document($body));
        $zip->close();

        $this->info('Resume written to '.$path.' ('.number_format(filesize($path) / 1024, 1).' KB)');

        return self::SUCCESS;
    }

    /**
     * Compose every section of the document.
     */
    private function buildBody(): string
    {
        $profile = Profile::current();

        $xml = $this->paragraph($profile->name, ['size' => 34, 'bold' => true, 'after' => 40]);
        $xml .= $this->paragraph($profile->headline, ['size' => 21, 'color' => '444444', 'after' => 60]);

        $contact = array_filter([
            $profile->location,
            $profile->phone,
            $profile->email,
            $profile->github_url ? preg_replace('#^https?://#', '', $profile->github_url) : null,
            $profile->linkedin_url ? preg_replace('#^https?://#', '', $profile->linkedin_url) : null,
        ]);

        $xml .= $this->paragraph(implode('  |  ', $contact), ['size' => 18, 'color' => '444444', 'after' => 60]);

        $facts = array_filter([
            $profile->nationality ? 'Nationality: '.$profile->nationality : null,
            $profile->birth_date ? 'Date of Birth: '.$profile->birth_date->format('j M Y') : null,
            $profile->spoken_languages ? 'Languages: '.$profile->spoken_languages : null,
        ]);

        if ($facts !== []) {
            $xml .= $this->paragraph(implode('  |  ', $facts), ['size' => 18, 'color' => '444444', 'after' => 160]);
        }

        $xml .= $this->heading('PROFESSIONAL SUMMARY');
        $xml .= $this->paragraph($profile->summary, ['after' => 160, 'justify' => true]);

        $xml .= $this->heading('TECHNICAL SKILLS');

        foreach (SkillCategory::query()->ordered()->with('skills')->get() as $category) {
            $skills = $category->skills->pluck('name')->implode(', ');

            $xml .= $this->runsParagraph([
                ['text' => $category->name.'  ', 'bold' => true],
                ['text' => $skills],
            ], ['after' => 40]);
        }

        $xml .= $this->spacer();
        $xml .= $this->heading('PROFESSIONAL EXPERIENCE');

        foreach (Experience::query()->ordered()->get() as $experience) {
            $xml .= $this->runsParagraph([
                ['text' => $experience->company, 'bold' => true, 'size' => 22],
                ['text' => $experience->location ? ' — '.$experience->location : '', 'color' => '444444'],
                ['text' => '    '.$experience->start_date.' – '.($experience->end_date ?: 'Present'), 'color' => '444444'],
            ], ['after' => 20, 'before' => 100]);

            $role = $experience->role.($experience->subtitle ? ' — '.$experience->subtitle : '');
            $xml .= $this->paragraph($role, ['italic' => true, 'color' => '444444', 'after' => 60]);

            foreach ($experience->highlights as $highlight) {
                $xml .= $this->bullet($highlight);
            }
        }

        $xml .= $this->spacer();
        $xml .= $this->heading('EDUCATION');

        foreach (Education::query()->ordered()->get() as $education) {
            $xml .= $this->runsParagraph([
                ['text' => $education->degree, 'bold' => true],
                ['text' => '    '.$education->start_year.' – '.$education->end_year, 'color' => '444444'],
            ], ['after' => 20]);

            $xml .= $this->paragraph($education->institution, ['color' => '444444', 'after' => 40]);

            foreach ($education->highlights as $highlight) {
                $xml .= $this->bullet($highlight);
            }
        }

        $xml .= $this->spacer();
        $xml .= $this->heading('CERTIFICATIONS & TRAINING');

        foreach (Certification::query()->ordered()->get() as $certification) {
            $detail = array_filter([$certification->issuer, $certification->year]);

            $xml .= $this->bullet(
                $certification->name.($detail !== [] ? ' — '.implode(', ', $detail) : '')
            );
        }

        $xml .= $this->spacer();
        $xml .= $this->heading('SELECTED PROJECTS');

        foreach (Project::query()->ordered()->get() as $project) {
            $runs = [
                ['text' => $project->name, 'bold' => true],
                ['text' => $project->category ? ' — '.$project->category : '', 'color' => '444444'],
            ];

            if ($project->tech !== []) {
                $runs[] = ['text' => '  ('.implode(', ', $project->tech).')', 'color' => '444444'];
            }

            $xml .= $this->runsParagraph($runs, ['after' => 20, 'before' => 80]);
            $xml .= $this->paragraph($project->description, ['size' => 19, 'after' => 20, 'justify' => true]);

            if ($project->links !== []) {
                $linkRuns = [];

                foreach ($project->links as $index => $link) {
                    if ($index > 0) {
                        $linkRuns[] = ['text' => '  ·  ', 'color' => '444444'];
                    }

                    $linkRuns[] = [
                        'text' => $link['label'],
                        'size' => 18,
                        'link' => $link['url'],
                    ];
                }

                $xml .= $this->runsParagraph($linkRuns, ['after' => 20]);
            }
        }

        return $xml;
    }

    /**
     * A section heading with a rule beneath it.
     */
    private function heading(string $text): string
    {
        return '<w:p><w:pPr><w:spacing w:before="200" w:after="80"/>'
            .'<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="2" w:color="BBBBBB"/></w:pBdr>'
            .'</w:pPr><w:r><w:rPr><w:b/><w:sz w:val="21"/><w:color w:val="1F3348"/>'
            .'<w:spacing w:val="30"/></w:rPr><w:t xml:space="preserve">'
            .$this->escape($text).'</w:t></w:r></w:p>';
    }

    /**
     * A bulleted line, indented with a hanging bullet character.
     */
    private function bullet(string $text): string
    {
        return '<w:p><w:pPr><w:spacing w:after="40" w:line="264" w:lineRule="auto"/>'
            .'<w:ind w:left="360" w:hanging="220"/><w:jc w:val="both"/></w:pPr>'
            .'<w:r><w:rPr><w:sz w:val="20"/></w:rPr><w:t xml:space="preserve">• '
            .$this->escape($text).'</w:t></w:r></w:p>';
    }

    private function spacer(): string
    {
        return '<w:p><w:pPr><w:spacing w:after="60"/></w:pPr></w:p>';
    }

    /**
     * A paragraph made of one uniformly formatted run.
     *
     * @param  array<string, mixed>  $options
     */
    private function paragraph(string $text, array $options = []): string
    {
        return $this->runsParagraph([['text' => $text] + $options], $options);
    }

    /**
     * A paragraph built from several differently formatted runs.
     *
     * @param  array<int, array<string, mixed>>  $runs
     * @param  array<string, mixed>  $options
     */
    private function runsParagraph(array $runs, array $options = []): string
    {
        $spacing = '<w:spacing w:after="'.($options['after'] ?? 60).'"'
            .' w:before="'.($options['before'] ?? 0).'" w:line="264" w:lineRule="auto"/>';

        $justify = ($options['justify'] ?? false) ? '<w:jc w:val="both"/>' : '';

        $xml = '<w:p><w:pPr>'.$spacing.$justify.'</w:pPr>';

        foreach ($runs as $run) {
            if (($run['text'] ?? '') === '') {
                continue;
            }

            $properties = '<w:sz w:val="'.($run['size'] ?? $options['size'] ?? 20).'"/>';

            if ($run['bold'] ?? false) {
                $properties .= '<w:b/>';
            }

            if ($run['italic'] ?? false) {
                $properties .= '<w:i/>';
            }

            if (isset($run['link'])) {
                $properties .= '<w:color w:val="BF4229"/><w:u w:val="single"/>';
            } elseif (isset($run['color'])) {
                $properties .= '<w:color w:val="'.$run['color'].'"/>';
            }

            $content = '<w:r><w:rPr>'.$properties.'</w:rPr>'
                .'<w:t xml:space="preserve">'.$this->escape($run['text']).'</w:t></w:r>';

            if (isset($run['link'])) {
                $id = 'rId'.(count($this->links) + 100);
                $this->links[$id] = $run['link'];
                $content = '<w:hyperlink r:id="'.$id.'">'.$content.'</w:hyperlink>';
            }

            $xml .= $content;
        }

        return $xml.'</w:p>';
    }

    private function escape(string $value): string
    {
        return htmlspecialchars($value, ENT_XML1 | ENT_QUOTES, 'UTF-8');
    }

    private function document(string $body): string
    {
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"'
            .' xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
            .'<w:body>'.$body
            .'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/>'
            .'<w:pgMar w:top="850" w:right="850" w:bottom="850" w:left="850"'
            .' w:header="0" w:footer="0" w:gutter="0"/></w:sectPr>'
            .'</w:body></w:document>';
    }

    private function styles(): string
    {
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
            .'<w:docDefaults><w:rPrDefault><w:rPr>'
            .'<w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Yu Gothic" w:cs="Calibri"/>'
            .'<w:sz w:val="20"/><w:szCs w:val="20"/><w:color w:val="16202C"/>'
            .'</w:rPr></w:rPrDefault></w:docDefaults></w:styles>';
    }

    private function contentTypes(): string
    {
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
            .'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
            .'<Default Extension="xml" ContentType="application/xml"/>'
            .'<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
            .'<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>'
            .'</Types>';
    }

    private function packageRels(): string
    {
        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            .'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
            .'</Relationships>';
    }

    private function documentRels(): string
    {
        $xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            .'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            .'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>';

        foreach ($this->links as $id => $target) {
            $xml .= '<Relationship Id="'.$id.'"'
                .' Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink"'
                .' Target="'.$this->escape($target).'" TargetMode="External"/>';
        }

        return $xml.'</Relationships>';
    }
}
