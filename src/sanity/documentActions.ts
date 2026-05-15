import type { DocumentActionComponent } from "sanity";

type BuiltInActionId = NonNullable<DocumentActionComponent["action"]>;

/** Actions editors expect in the document ⋯ menu (not only the footer). */
const ELEVATE_TO_PANE_MENU: BuiltInActionId[] = ["delete", "discardChanges"];

/**
 * Built-in delete/discard actions default to the document footer (`group: "default"`).
 * This wraps them so they also appear in the document overflow menu (`paneActions`),
 * next to History, Inspect, Copy document, etc.
 *
 * @see https://www.sanity.io/docs/studio/document-actions-api — `group` on action descriptions
 */
export function elevateDestructiveActionsToDocumentMenu(
  actions: DocumentActionComponent[],
): DocumentActionComponent[] {
  return actions.map((original) => {
    const id = original.action;
    if (!id || !ELEVATE_TO_PANE_MENU.includes(id)) return original;

    return Object.assign(
      (props: Parameters<DocumentActionComponent>[0]) => {
        const description = original(props);
        if (!description) return null;
        return { ...description, group: "paneActions" as const };
      },
      {
        action: id,
        ...(original.displayName !== undefined ? { displayName: original.displayName } : {}),
      },
    ) as DocumentActionComponent;
  });
}
