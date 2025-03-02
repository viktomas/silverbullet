import { Manifest } from "../lib/manifest.ts";
import { PageMeta } from "../plug-api/types.ts";
import { AppCommand } from "../lib/command.ts";
import { defaultSettings } from "$common/settings.ts";
import {
  ActionButton,
  EmojiConfig,
  FilterOption,
  Notification,
  PanelMode,
  Shortcut,
} from "$lib/web.ts";

export type BuiltinSettings = {
  indexPage: string;
  customStyles?: string | string[];
  plugOverrides?: Record<string, Partial<Manifest>>;
  shortcuts?: Shortcut[];
  hideSyncButton?: boolean;
  hideEditButton?: boolean;
  maximumAttachmentSize?: number;
  defaultLinkStyle?: string;
  actionButtons: ActionButton[];
  // Format: compatible with docker ignore
  spaceIgnore?: string;
  emoji?: EmojiConfig;
};

export type PanelConfig = {
  mode?: PanelMode;
  html?: string;
  script?: string;
};

export type AppViewState = {
  currentPage?: string;
  currentPageMeta?: PageMeta;
  allPages: PageMeta[];

  isLoading: boolean;
  isMobile: boolean;
  showPageNavigator: boolean;
  showCommandPalette: boolean;
  showCommandPaletteContext?: string;
  unsavedChanges: boolean;
  syncFailures: number; // Reset everytime a sync succeeds
  progressPerc?: number;
  panels: { [key: string]: PanelConfig };
  commands: Map<string, AppCommand>;
  notifications: Notification[];
  recentCommands: Map<string, Date>;

  settings: BuiltinSettings;

  uiOptions: {
    vimMode: boolean;
    darkMode: boolean;
    forcedROMode: boolean;
    customStyles?: string;
  };

  // Page navigator mode
  pageNavigatorMode: "page" | "template";

  // Filter box
  showFilterBox: boolean;
  filterBoxLabel: string;
  filterBoxPlaceHolder: string;
  filterBoxOptions: FilterOption[];
  filterBoxHelpText: string;
  filterBoxOnSelect: (option: FilterOption | undefined) => void;

  // Prompt
  showPrompt: boolean;
  promptMessage?: string;
  promptDefaultValue?: string;
  promptCallback?: (value: string | undefined) => void;

  // Confirm
  showConfirm: boolean;
  confirmMessage?: string;
  confirmCallback?: (value: boolean) => void;
};

export const initialViewState: AppViewState = {
  isLoading: false,
  showPageNavigator: false,
  showCommandPalette: false,
  pageNavigatorMode: "page",
  unsavedChanges: false,
  syncFailures: 0,
  uiOptions: {
    vimMode: false,
    darkMode: false,
    forcedROMode: false,
  },
  isMobile: false,
  panels: {
    lhs: {},
    rhs: {},
    bhs: {},
    modal: {},
  },
  settings: defaultSettings,
  allPages: [],
  commands: new Map(),
  recentCommands: new Map(),
  notifications: [],
  showFilterBox: false,
  filterBoxHelpText: "",
  filterBoxLabel: "",
  filterBoxOnSelect: () => {},
  filterBoxOptions: [],
  filterBoxPlaceHolder: "",

  showPrompt: false,
  showConfirm: false,
};

export type Action =
  | { type: "page-loaded"; meta: PageMeta }
  | { type: "page-loading"; name: string }
  | { type: "page-changed" }
  | { type: "page-saved" }
  | { type: "sync-change"; syncSuccess: boolean }
  | { type: "update-page-list"; allPages: PageMeta[] }
  | { type: "settings-loaded"; settings: BuiltinSettings }
  | { type: "start-navigate"; mode: "page" | "template" }
  | { type: "stop-navigate" }
  | {
    type: "update-commands";
    commands: Map<string, AppCommand>;
  }
  | { type: "show-palette"; context?: string }
  | { type: "hide-palette" }
  | { type: "show-notification"; notification: Notification }
  | { type: "dismiss-notification"; id: number }
  | {
    type: "show-panel";
    id: "rhs" | "lhs" | "bhs" | "modal";
    config: PanelConfig;
  }
  | { type: "hide-panel"; id: string }
  | { type: "command-run"; command: string }
  | {
    type: "show-filterbox";
    options: FilterOption[];
    placeHolder: string;
    helpText: string;
    label: string;
    onSelect: (option: FilterOption | undefined) => void;
  }
  | { type: "hide-filterbox" }
  | {
    type: "show-prompt";
    message: string;
    defaultValue: string;
    callback: (value: string | undefined) => void;
  }
  | { type: "hide-prompt" }
  | {
    type: "show-confirm";
    message: string;
    callback: (value: boolean) => void;
  }
  | { type: "hide-confirm" }
  | { type: "set-ui-option"; key: string; value: any }
  | { type: "set-progress"; progressPerc?: number };
