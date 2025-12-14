// =============================================================================
// NAVIGATION CONFIG
// =============================================================================
// Hierarchical structure: Modules > Features > Pages
// - Modules: Top-level navigation items
// - Features: Dropdown items under modules (each has its own route)
// - Pages: Content sections inside a feature (rendered as tabs or vertical stack)

export type FeatureLayout = "tabs" | "vertical" | "single";

export interface PageConfig {
  id: string;
  label: string;
  icon?: string;
}

export interface FeatureConfig {
  id: string;
  label: string;
  icon?: string;
  path: string;
  layout?: FeatureLayout; // How to render pages: tabs, vertical, or single (default)
  pages?: PageConfig[];
}

export interface ModuleConfig {
  id: string;
  label: string;
  icon?: string;
  path?: string; // Direct path if no features (like Dashboard)
  features?: FeatureConfig[];
}

export interface NavigationConfig {
  modules: ModuleConfig[];
}

// =============================================================================
// NAVIGATION CONFIG DATA
// =============================================================================

export const navigationConfig: NavigationConfig = {
  modules: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "dashboard",
      path: "/",
    },
    {
      id: "data",
      label: "Data",
      icon: "data",
      features: [
        {
          id: "tables",
          label: "Tables",
          icon: "table",
          path: "/tables",
          layout: "tabs",
          pages: [
            { id: "basic", label: "Basic Tables", icon: "table" },
            { id: "sortable", label: "Sortable", icon: "sort" },
            { id: "datagrid", label: "Data Grid", icon: "grid" },
          ],
        },
        {
          id: "trees",
          label: "Tree Views",
          icon: "tree",
          path: "/trees",
          layout: "single",
        },
        {
          id: "json-editor",
          label: "JSON Editor",
          icon: "json",
          path: "/json-editor",
          layout: "tabs",
          pages: [
            { id: "form", label: "Form View", icon: "form" },
            { id: "tree", label: "Tree View", icon: "tree" },
            { id: "diff", label: "Diff View", icon: "compare" },
          ],
        },
      ],
    },
    {
      id: "ui-elements",
      label: "UI Elements",
      icon: "widgets",
      features: [
        {
          id: "cards",
          label: "Cards",
          icon: "card",
          path: "/cards",
          layout: "single",
        },
        {
          id: "navbars",
          label: "Navbars",
          icon: "nav",
          path: "/navbars",
          layout: "single",
        },
        {
          id: "buttons",
          label: "Buttons",
          icon: "button",
          path: "/buttons",
          layout: "single",
        },
        {
          id: "more-components",
          label: "More Components",
          icon: "widgets",
          path: "/more-components",
          layout: "vertical",
          pages: [
            { id: "tabs", label: "Tabs", icon: "tab" },
            { id: "stepper", label: "Stepper", icon: "stepper" },
            { id: "accordion", label: "Accordion", icon: "accordion" },
            { id: "lists", label: "Lists", icon: "list" },
            { id: "skeleton", label: "Skeleton", icon: "skeleton" },
            { id: "alerts", label: "Alerts", icon: "alert" },
            { id: "breadcrumbs", label: "Breadcrumbs", icon: "breadcrumb" },
          ],
        },
      ],
    },
    {
      id: "forms-dialogs",
      label: "Forms & Dialogs",
      icon: "form",
      features: [
        {
          id: "forms",
          label: "Forms",
          icon: "form",
          path: "/forms",
          layout: "tabs",
          pages: [
            { id: "login", label: "Login Form", icon: "login" },
            { id: "registration", label: "Registration", icon: "register" },
            { id: "profile", label: "Profile Form", icon: "profile" },
          ],
        },
        {
          id: "dialogs",
          label: "Dialogs",
          icon: "dialog",
          path: "/dialogs",
          layout: "single",
        },
      ],
    },
    {
      id: "theming",
      label: "Theming",
      icon: "palette",
      features: [
        {
          id: "theme-editor",
          label: "Theme Editor",
          icon: "edit",
          path: "/theme-editor",
          layout: "single",
        },
        {
          id: "theme-colors",
          label: "Theme Colors",
          icon: "palette",
          path: "/theme-colors",
          layout: "single",
        },
        {
          id: "styled-components",
          label: "Styled Components",
          icon: "style",
          path: "/styled",
          layout: "tabs",
          pages: [
            { id: "buttons", label: "Buttons", icon: "button" },
            { id: "cards", label: "Cards", icon: "card" },
            { id: "inputs", label: "Inputs", icon: "input" },
            { id: "chips", label: "Chips & Badges", icon: "chip" },
          ],
        },
        {
          id: "typography",
          label: "Typography",
          icon: "typography",
          path: "/typography",
          layout: "single",
        },
      ],
    },
  ],
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getFeatureByPath(path: string): FeatureConfig | undefined {
  for (const module of navigationConfig.modules) {
    if (module.features) {
      const feature = module.features.find((f) => f.path === path);
      if (feature) return feature;
    }
  }
  return undefined;
}

export function getModuleByPath(path: string): ModuleConfig | undefined {
  return navigationConfig.modules.find((m) => {
    if (m.path === path) return true;
    if (m.features) {
      return m.features.some((f) => f.path === path);
    }
    return false;
  });
}

export default navigationConfig;
