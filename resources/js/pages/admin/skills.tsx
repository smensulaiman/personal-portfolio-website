import { Form, Head } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';
import { useState } from 'react';
import { ConfirmDelete } from '@/components/admin/confirm-delete';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import admin from '@/routes/admin';
import type { Skill, SkillCategory } from '@/types/portfolio';

type Props = {
    categories: SkillCategory[];
};

type CategoryDialogState =
    { mode: 'create' } | { mode: 'edit'; category: SkillCategory };

type SkillDialogState =
    { mode: 'create'; categoryId: number } | { mode: 'edit'; skill: Skill };

/** Small live preview so icon classes can be checked while typing. */
function IconPreview({ value }: { value: string }) {
    return (
        <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <i className={value || 'bx bx-code-alt'} aria-hidden="true" />
            Preview
        </span>
    );
}

function CategoryDialog({
    state,
    onClose,
}: {
    state: CategoryDialogState | null;
    onClose: () => void;
}) {
    const category = state?.mode === 'edit' ? state.category : null;
    const [iconClass, setIconClass] = useState('');

    if (!state) {
        return null;
    }

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <Form
                    {...(category
                        ? admin.skillCategories.update.form(category.id)
                        : admin.skillCategories.store.form())}
                    onSuccess={onClose}
                >
                    {({ processing, errors }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    {category ? 'Edit' : 'New'} category
                                </DialogTitle>
                                <DialogDescription>
                                    Categories group the skills shown in the
                                    Expertise section.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="mt-4 grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="category-name">Name</Label>
                                    <Input
                                        id="category-name"
                                        name="name"
                                        required
                                        defaultValue={category?.name ?? ''}
                                        placeholder="Languages"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="category-icon">
                                        Boxicons class
                                    </Label>
                                    <Input
                                        id="category-icon"
                                        name="icon_class"
                                        defaultValue={
                                            category?.icon_class ?? ''
                                        }
                                        onChange={(event) =>
                                            setIconClass(event.target.value)
                                        }
                                        placeholder="bx bx-code-alt"
                                    />
                                    <IconPreview
                                        value={
                                            iconClass ||
                                            category?.icon_class ||
                                            ''
                                        }
                                    />
                                    <InputError message={errors.icon_class} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="category-order">
                                        Sort order
                                    </Label>
                                    <Input
                                        id="category-order"
                                        name="sort_order"
                                        type="number"
                                        min={0}
                                        defaultValue={category?.sort_order ?? 0}
                                    />
                                    <InputError message={errors.sort_order} />
                                </div>
                            </div>

                            <DialogFooter className="mt-6 gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" type="button">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    Save
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function SkillDialog({
    state,
    onClose,
}: {
    state: SkillDialogState | null;
    onClose: () => void;
}) {
    const skill = state?.mode === 'edit' ? state.skill : null;
    const [iconClass, setIconClass] = useState('');

    if (!state) {
        return null;
    }

    const categoryId =
        state.mode === 'create'
            ? state.categoryId
            : state.skill.skill_category_id;

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <Form
                    {...(skill
                        ? admin.skills.update.form(skill.id)
                        : admin.skills.store.form())}
                    onSuccess={onClose}
                >
                    {({ processing, errors }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>
                                    {skill ? 'Edit' : 'New'} skill
                                </DialogTitle>
                                <DialogDescription>
                                    Icons use Boxicons classes, for example{' '}
                                    <code>bx bxl-java</code>.
                                </DialogDescription>
                            </DialogHeader>

                            <input
                                type="hidden"
                                name="skill_category_id"
                                value={categoryId}
                            />

                            <div className="mt-4 grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="skill-name">Name</Label>
                                    <Input
                                        id="skill-name"
                                        name="name"
                                        required
                                        defaultValue={skill?.name ?? ''}
                                        placeholder="Laravel"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="skill-icon">
                                        Boxicons class
                                    </Label>
                                    <Input
                                        id="skill-icon"
                                        name="icon_class"
                                        defaultValue={skill?.icon_class ?? ''}
                                        onChange={(event) =>
                                            setIconClass(event.target.value)
                                        }
                                        placeholder="bx bxl-java"
                                    />
                                    <IconPreview
                                        value={
                                            iconClass || skill?.icon_class || ''
                                        }
                                    />
                                    <InputError message={errors.icon_class} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="skill-order">
                                        Sort order
                                    </Label>
                                    <Input
                                        id="skill-order"
                                        name="sort_order"
                                        type="number"
                                        min={0}
                                        defaultValue={skill?.sort_order ?? 0}
                                    />
                                    <InputError message={errors.sort_order} />
                                </div>
                            </div>

                            <DialogFooter className="mt-6 gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" type="button">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing}>
                                    Save
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default function AdminSkills({ categories }: Props) {
    const [categoryDialog, setCategoryDialog] =
        useState<CategoryDialogState | null>(null);
    const [skillDialog, setSkillDialog] = useState<SkillDialogState | null>(
        null,
    );

    return (
        <>
            <Head title="Skills" />

            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <Heading
                        title="Skills"
                        description="Grouped into the categories shown on the public site."
                    />

                    <Button
                        onClick={() => setCategoryDialog({ mode: 'create' })}
                    >
                        <Plus />
                        New category
                    </Button>
                </div>

                {categories.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No categories yet — create one to get started.
                    </p>
                ) : (
                    <div className="grid gap-4 lg:grid-cols-2">
                        {categories.map((category) => (
                            <Card key={category.id}>
                                <CardHeader className="flex-row items-center justify-between gap-2 space-y-0">
                                    <CardTitle className="flex items-center gap-2">
                                        <i
                                            className={
                                                category.icon_class ??
                                                'bx bx-code-alt'
                                            }
                                            aria-hidden="true"
                                        />
                                        {category.name}
                                    </CardTitle>

                                    <div className="flex items-center gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label={`Edit ${category.name}`}
                                            onClick={() =>
                                                setCategoryDialog({
                                                    mode: 'edit',
                                                    category,
                                                })
                                            }
                                        >
                                            <Pencil />
                                        </Button>

                                        <ConfirmDelete
                                            action={admin.skillCategories.destroy.form(
                                                category.id,
                                            )}
                                            label={category.name}
                                            description="Deleting a category also removes every skill inside it."
                                        />
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <ul className="divide-y">
                                        {category.skills.map((skill) => (
                                            <li
                                                key={skill.id}
                                                className="flex items-center justify-between gap-2 py-2"
                                            >
                                                <span className="flex items-center gap-2 text-sm">
                                                    <i
                                                        className={
                                                            skill.icon_class ??
                                                            'bx bx-chevron-right'
                                                        }
                                                        aria-hidden="true"
                                                    />
                                                    {skill.name}
                                                </span>

                                                <span className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label={`Edit ${skill.name}`}
                                                        onClick={() =>
                                                            setSkillDialog({
                                                                mode: 'edit',
                                                                skill,
                                                            })
                                                        }
                                                    >
                                                        <Pencil />
                                                    </Button>

                                                    <ConfirmDelete
                                                        action={admin.skills.destroy.form(
                                                            skill.id,
                                                        )}
                                                        label={skill.name}
                                                    />
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mt-4"
                                        onClick={() =>
                                            setSkillDialog({
                                                mode: 'create',
                                                categoryId: category.id,
                                            })
                                        }
                                    >
                                        <Plus />
                                        Add skill
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <CategoryDialog
                state={categoryDialog}
                onClose={() => setCategoryDialog(null)}
            />
            <SkillDialog
                state={skillDialog}
                onClose={() => setSkillDialog(null)}
            />
        </>
    );
}

AdminSkills.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: admin.dashboard() },
        { title: 'Skills', href: admin.skills.index() },
    ],
};
