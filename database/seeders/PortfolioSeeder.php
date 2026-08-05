<?php

namespace Database\Seeders;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SkillCategory;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Seed the portfolio content taken from the resume.
     */
    public function run(): void
    {
        $this->seedProfile();
        $this->seedSkills();
        $this->seedExperiences();
        $this->seedEducation();
        $this->seedCertifications();
        $this->seedProjects();
    }

    private function seedProfile(): void
    {
        Profile::query()->updateOrCreate(['id' => 1], [
            'name' => 'MD. Sulaiman',
            'headline' => 'Full-Stack Software Engineer — Web & Mobile · AI-Driven Development',
            'summary' => 'Full-stack software engineer with seven years of experience delivering web and mobile products across Japan and Bangladesh. Ships production systems end to end with PHP/Laravel and native Android (Java), with more than a dozen apps live on Google Play and the App Store. At Senda Japan Ltd. (Autocraft Japan Ltd.), builds and maintains the group\'s in-house business platforms end to end and drives AI-driven development with Claude Code to deliver faster without compromising engineering quality.',
            'email' => 'smensulaiman007@gmail.com',
            'phone' => '+81-90-1973-5910',
            'location' => 'Koshigaya, Saitama, Japan',
            'github_url' => 'https://github.com/smensulaiman',
            'linkedin_url' => 'https://www.linkedin.com/in/smensulaiman/',
            'nationality' => 'Bangladeshi',
            'spoken_languages' => 'English, Bangla',
            'birth_date' => '1995-11-24',
            // Ships in public/; admin uploads store a public-disk path instead.
            'avatar_path' => '/solaimam-web.jpg',
            'resume_path' => null,
        ]);
    }

    private function seedSkills(): void
    {
        // Boxicons has no Ubuntu, Cloudflare or Redis logo, so those fall back
        // to the closest available marks: the Linux penguin, a shield, and a
        // memory card for Redis' in-memory store.
        $categories = [
            [
                'name' => 'AI-Driven Development',
                'icon_class' => 'bx bx-brain',
                'skills' => [
                    ['Claude Code (agentic coding)', 'bx bx-bot'],
                    ['AI-assisted code review', 'bx bx-code-block'],
                    ['AI-assisted debugging', 'bx bx-bug'],
                    ['AI-assisted documentation', 'bx bx-file'],
                ],
            ],
            [
                'name' => 'Languages',
                'icon_class' => 'bx bx-code-alt',
                'skills' => [
                    ['Java', 'bx bxl-java'],
                    ['PHP', 'bx bxl-php'],
                    ['JavaScript', 'bx bxl-javascript'],
                    ['C#', 'bx bx-code-alt'],
                    ['Python', 'bx bxl-python'],
                ],
            ],
            [
                'name' => 'Backend',
                'icon_class' => 'bx bx-server',
                'skills' => [
                    ['Laravel', 'bx bx-layer'],
                    ['Livewire', 'bx bx-bolt-circle'],
                    ['Spring Boot', 'bx bxl-spring-boot'],
                    ['Node.js', 'bx bxl-nodejs'],
                    ['REST APIs', 'bx bx-transfer-alt'],
                    ['MVC', 'bx bx-network-chart'],
                ],
            ],
            [
                'name' => 'Frontend',
                'icon_class' => 'bx bx-layout',
                'skills' => [
                    ['Vue.js', 'bx bxl-vuejs'],
                    ['React', 'bx bxl-react'],
                    ['Tailwind CSS', 'bx bxl-tailwind-css'],
                    ['Bootstrap', 'bx bxl-bootstrap'],
                ],
            ],
            [
                'name' => 'Mobile',
                'icon_class' => 'bx bx-mobile-alt',
                'skills' => [
                    ['Native Android (Java)', 'bx bxl-android'],
                    ['React Native', 'bx bxl-react'],
                    ['Unity', 'bx bxl-unity'],
                    ['MVVM', 'bx bx-sitemap'],
                ],
            ],
            [
                'name' => 'Databases',
                'icon_class' => 'bx bx-data',
                'skills' => [
                    ['MySQL', 'bx bx-data'],
                    ['Redis', 'bx bx-memory-card'],
                    ['Firebase', 'bx bxl-firebase'],
                    ['Room', 'bx bx-box'],
                    ['Realm', 'bx bx-cube'],
                ],
            ],
            [
                'name' => 'Cloud & Infrastructure',
                'icon_class' => 'bx bx-cloud',
                'skills' => [
                    ['AWS (EC2)', 'bx bxl-aws'],
                    ['Laravel Cloud', 'bx bx-cloud'],
                    ['Cloudflare', 'bx bx-shield'],
                    ['Apache2', 'bx bx-server'],
                    ['Domain & DNS', 'bx bx-world'],
                ],
            ],
            [
                'name' => 'Operating Systems',
                'icon_class' => 'bx bx-desktop',
                'skills' => [
                    ['Linux', 'bx bxl-tux'],
                    ['Windows', 'bx bxl-windows'],
                    ['macOS', 'bx bxl-apple'],
                ],
            ],
            [
                'name' => 'Tools & Workflow',
                'icon_class' => 'bx bx-wrench',
                'skills' => [
                    ['Git', 'bx bxl-git'],
                    ['GitHub', 'bx bxl-github'],
                    ['GitLab', 'bx bxl-gitlab'],
                    ['Postman', 'bx bx-send'],
                    ['Slack', 'bx bxl-slack'],
                    ['Backlog', 'bx bx-task'],
                ],
            ],
        ];

        foreach ($categories as $order => $category) {
            $model = SkillCategory::query()->updateOrCreate(
                ['name' => $category['name']],
                ['icon_class' => $category['icon_class'], 'sort_order' => $order],
            );

            foreach ($category['skills'] as $skillOrder => [$name, $iconClass]) {
                Skill::query()->updateOrCreate(
                    ['skill_category_id' => $model->id, 'name' => $name],
                    ['icon_class' => $iconClass, 'sort_order' => $skillOrder],
                );
            }

            // The list above is authoritative: prune skills it no longer names
            // so re-seeding reflects removals, not just additions.
            Skill::query()
                ->where('skill_category_id', $model->id)
                ->whereNotIn('name', array_column($category['skills'], 0))
                ->delete();
        }

        SkillCategory::query()
            ->whereNotIn('name', array_column($categories, 'name'))
            ->delete();
    }

    private function seedExperiences(): void
    {
        $experiences = [
            [
                'company' => 'Senda Japan Ltd.',
                'location' => 'Japan',
                'role' => 'Software Engineer (Web & Android)',
                'subtitle' => 'In-house IT company of Autocraft Japan Ltd.',
                'start_date' => 'Dec 2022',
                'end_date' => null,
                'highlights' => [
                    'Develop and maintain Auction Pro, an in-house car auction bidding platform built by Senda Japan for Autocraft Japan, serving ~400 users and 50,000+ vehicle lots per day across agent, sub-agent, customer, and bidder roles; migrated it from on-premises to AWS EC2 and optimized performance (PHP).',
                    'Engineered AI-driven price prediction from vehicles\' historical auction records, cutting under-priced losing bids by ~30% and lifting agents\' win ratio; added personalized "daily top cars" recommendations and a live analytics dashboard.',
                    'Built the Autocraft Japan e-commerce platform, merging the company\'s own stock with vendor inventory from Aucnet, Gonet and CHS through nightly cron sync — around 130,000 live listings — with Stripe checkout across multiple languages and currencies, serving millions of visits worldwide.',
                    'Delivered a Yard Management System (Laravel, Livewire) for shipment tracking across yards and export vessels, and single-handedly built its companion native Android app, Senda Snap (Java) — task management, in-app chat, and auction-lot photo capture.',
                    'Shipped, single-handedly, a vehicle parts inventory and POS system for Autocraft Japan\'s Samoa branch (Laravel, Livewire) — live and in daily use.',
                    'Delivered a fashion inventory system for a client (PHP, Bootstrap, MySQL) and built Tohon QR, a native Android app that scans and decodes vehicle-registration QR codes and pushes data to an internal Autocraft system via REST API.',
                    'Learned server setup here — installing and configuring Linux and Apache2 from scratch — then used it to shut down a sustained brute-force attack on the e-commerce site with Cloudflare, Apache security rules and rate limiting, plus a live dashboard tracking blocked IPs and user agents.',
                    'Learned Laravel here, and it is now the framework behind most of the web systems above.',
                    'Learned AI-assisted development here and now drive it across the team — using Claude Code for implementation, debugging, code review, and documentation.',
                    'Administer AWS, databases, and hosting; maintain published iOS and Android apps; and coordinate an overseas development team.',
                ],
            ],
            [
                'company' => 'Suffix IT Limited',
                'location' => 'Dhaka, Bangladesh',
                'role' => 'Android Application Developer (Team Lead)',
                'subtitle' => null,
                'start_date' => 'Jan 2021',
                'end_date' => 'Sep 2022',
                'highlights' => [
                    'Led the mobile team across the company\'s Android products, owning architecture, code review, and Google Play releases across a wide range of devices and OS versions.',
                    'Architected a field force management app from scratch and grew it to 2,000+ field users — employee tracking, attendance, payroll, leave, expense bills, push notifications, and custom reports.',
                    'Spent a month embedded at AKG\'s head office in Chittagong gathering requirements directly from the business and running the pilot rollout.',
                    'Field-tested across sales territories alongside area managers, sales officers, and sales representatives, turning first-hand end-user feedback into product changes before wider release.',
                    'Built offline-first synchronisation so field staff kept working without connectivity, reconciling queued records on reconnect.',
                    'Implemented continuous background GPS tracking tuned for battery life across full field shifts.',
                    'Integrated fingerprint scanner and portable thermal printer SDKs for secure attendance capture and on-site receipt printing.',
                    'Delivered attendance-to-payroll calculation with custom report generation and exports for client back offices.',
                    'Worked closely with the backend team on API contracts, picking up Spring Boot and REST API development alongside the Android work.',
                ],
            ],
            [
                'company' => 'eTracker Solutions',
                'location' => 'Dhaka, Bangladesh',
                'role' => 'Junior Android Developer',
                'subtitle' => null,
                'start_date' => 'Jun 2019',
                'end_date' => 'Jan 2021',
                'highlights' => [
                    'Re-architected a sales force management and billing-automation Android app, improving performance and modernizing the UI.',
                    'Implemented offline data archiving, batch data upload, and real-time chat, and integrated Retrofit for efficient REST API communication.',
                    'Integrated third-party Android libraries and SDKs into production apps, including a payment gateway for an online pharmacy.',
                    'Picked up Unity and C# here, going on to build and release cross-platform 3D medical reference apps for a Japanese client, collaborating with their team through Backlog.',
                    'Built the collaboration fundamentals relied on ever since — a shared Git workflow with branching and code review, and REST API testing and debugging with Postman.',
                    'Ran client field visits to validate real-world performance and resolved production and QA issues.',
                ],
            ],
        ];

        foreach ($experiences as $order => $experience) {
            Experience::query()->updateOrCreate(
                ['company' => $experience['company'], 'role' => $experience['role']],
                [...$experience, 'sort_order' => $order],
            );
        }
    }

    private function seedEducation(): void
    {
        Education::query()->updateOrCreate(
            ['institution' => 'Northern University of Bangladesh'],
            [
                'degree' => 'BSc in Computer Science & Engineering',
                'start_year' => '2014',
                'end_year' => '2018',
                'highlights' => [
                    'Champion, Programming Contest & Project Showcase — Northern University CSE Day (2017, 2018)',
                ],
                'sort_order' => 0,
            ],
        );
    }

    private function seedCertifications(): void
    {
        $certifications = [
            [
                'name' => 'Oracle Certified Associate (OCA), Java SE 8 Programmer',
                'issuer' => 'Oracle',
                // Boxicons carries no Oracle mark, so both Java credentials use
                // the Java logo, which is what each actually certifies.
                'icon_class' => 'bx bxl-java',
                'year' => '2021',
            ],
            [
                'name' => 'Java EE training',
                'issuer' => 'Leveraging ICT programme, Government of Bangladesh',
                'icon_class' => 'bx bxl-java',
                'year' => null,
            ],
        ];

        foreach ($certifications as $order => $certification) {
            Certification::query()->updateOrCreate(
                ['name' => $certification['name']],
                [...$certification, 'sort_order' => $order],
            );
        }
    }

    private function seedProjects(): void
    {
        $projects = [
            [
                'name' => 'Auction Pro',
                'description' => 'Car auction bidding platform with AI price prediction and per-customer recommendations, serving ~400 users across 50,000+ vehicle lots per day. Built in-house at Senda Japan for Autocraft Japan.',
                'category' => 'Web Platform',
                'tech' => ['PHP', 'MySQL', 'AWS EC2'],
                'links' => [],
                'featured' => true,
            ],
            [
                'name' => 'Yard Management System + Senda Snap',
                'description' => 'Vehicle shipment tracking across yards and export vessels, with a companion Android app for task management, in-app chat, and auction-lot photo capture.',
                'category' => 'Web Platform & Mobile',
                'tech' => ['Laravel', 'Livewire', 'Java', 'Android'],
                'links' => [
                    ['label' => 'Google Play', 'url' => 'https://play.google.com/store/apps/details?id=com.sendajapan.sendasnap'],
                ],
                'featured' => true,
            ],
            [
                'name' => 'Vehicle Parts Management System',
                'description' => 'Parts inventory and point-of-sale system built single-handedly for Autocraft Japan\'s Samoa branch — live and in daily use.',
                'category' => 'Web Platform',
                'tech' => ['Laravel', 'Livewire', 'MySQL'],
                'links' => [],
                'featured' => true,
            ],
            [
                'name' => '骨まる (Hone Maru)',
                'description' => '3D bone anatomy reference app built with Unity for a Japanese client while at eTracker Solutions, working directly with their team through Backlog.',
                'category' => 'Mobile App',
                'tech' => ['Unity', 'C#'],
                'links' => [
                    ['label' => 'App Store', 'url' => 'https://apps.apple.com/jp/app/%E9%AA%A8%E3%81%BE%E3%82%8B/id1582121318'],
                    ['label' => 'Product page', 'url' => 'https://www.roundflat.jp/products/jintai/bone/bone.html'],
                ],
                'featured' => true,
            ],
            [
                'name' => 'Tohon QR',
                'description' => 'Native Android app that scans and decodes vehicle registration document QR codes and pushes the data to an internal system via REST API.',
                'category' => 'Mobile App',
                'tech' => ['Java', 'Android', 'REST API'],
                'links' => [],
                'featured' => false,
            ],
            [
                'name' => 'Fashion Item Inventory Management System',
                'description' => 'Inventory management system delivered for a fashion retail client. Internal system.',
                'category' => 'Web Platform',
                'tech' => ['PHP', 'Bootstrap', 'MySQL'],
                'links' => [],
                'featured' => false,
            ],
            [
                'name' => 'BONE: 骨折と脱臼',
                'description' => 'Bone Fracture & Dislocation in 3D — a medical reference app for studying fractures and dislocations, built with Unity for a Japanese client while at eTracker Solutions.',
                'category' => 'Mobile App',
                'tech' => ['Unity', 'C#'],
                'links' => [
                    ['label' => 'Product page', 'url' => 'https://www.roundflat.jp/products/jintai/fracture/'],
                ],
                'featured' => false,
            ],
            [
                'name' => 'Hello Butcher',
                'description' => 'Online meat ordering app shipped to Google Play and the App Store.',
                'category' => 'Mobile App',
                'tech' => ['Java', 'Android'],
                'links' => [],
                'featured' => false,
            ],
            [
                'name' => 'Sales Assistant',
                'description' => 'Sales force management system with separate applications for field users and the company back office.',
                'category' => 'Mobile App',
                'tech' => ['Java', 'Android', 'Retrofit'],
                'links' => [],
                'featured' => false,
            ],
            [
                'name' => 'Bangladesh Thai Aluminium Sales Force',
                'description' => 'Customized sales force deployment with dedicated user and admin applications.',
                'category' => 'Mobile App',
                'tech' => ['Java', 'Android'],
                'links' => [],
                'featured' => false,
            ],
            [
                'name' => 'Tamim Group Field Force',
                'description' => 'Field force management deployment covering employee tracking, attendance, and reporting.',
                'category' => 'Mobile App',
                'tech' => ['Java', 'Android'],
                'links' => [
                    ['label' => 'Admin app', 'url' => 'https://play.google.com/store/apps/details?id=com.ets.tamimgroup.admin'],
                ],
                'featured' => false,
            ],
            [
                'name' => 'Wellbeing Pharmacy',
                'description' => 'Online pharmacy app with an integrated payment gateway.',
                'category' => 'Mobile App',
                'tech' => ['Java', 'Android', 'Payment Gateway'],
                'links' => [],
                'featured' => false,
            ],
            [
                'name' => 'Somriddhi Club (Elite Paint)',
                'description' => 'Loyalty applications for paint dealers and painters, each with its own rewards workflow.',
                'category' => 'Mobile App',
                'tech' => ['Java', 'Android'],
                'links' => [
                    ['label' => 'Dealer app', 'url' => 'https://play.google.com/store/apps/details?id=com.ets.elitepaint.dealer'],
                    ['label' => 'Painter app', 'url' => 'https://play.google.com/store/apps/details?id=com.ets.elitepaint.painter'],
                ],
                'featured' => false,
            ],
            [
                'name' => 'FourB Notes',
                'description' => 'Note-taking app for Android with offline storage.',
                'category' => 'Mobile App',
                'tech' => ['Java', 'Android', 'Room'],
                'links' => [],
                'featured' => false,
            ],
            [
                'name' => 'Police Regulation of Bengal',
                'description' => 'Searchable law reference app covering the Police Regulation of Bengal.',
                'category' => 'Mobile App',
                'tech' => ['Java', 'Android'],
                'links' => [],
                'featured' => false,
            ],
            [
                'name' => 'Autocraft Japan',
                'description' => 'Used-car e-commerce platform selling Autocraft Japan\'s own stock alongside vendor inventory from Aucnet, Gonet and CHS, merged nightly by cron scripts into around 130,000 live listings. Multi-language and multi-currency with Stripe checkout, serving millions of visits worldwide. Hardened against a sustained brute-force attack with Cloudflare, Apache security rules and rate limiting, backed by a live dashboard of blocked IPs and user agents.',
                'category' => 'E-commerce Platform',
                'tech' => ['PHP', 'MySQL', 'Stripe', 'Cloudflare', 'Apache2', 'Cron'],
                'links' => [
                    ['label' => 'Website', 'url' => 'https://www.autocraftjapan.com/'],
                ],
                'featured' => true,
            ],
        ];

        foreach ($projects as $order => $project) {
            $model = Project::query()->firstOrNew(['name' => $project['name']]);

            // Seed the starting position only. Once a project exists its
            // `sort_order` belongs to the admin drag-and-drop UI, so re-seeding
            // must not throw away a curated running order.
            if (! $model->exists) {
                $model->sort_order = $order;
            }

            $model->fill($project)->save();
        }
    }
}
