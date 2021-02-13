export default {
  header: {
    self: {},
    items: [
      // {
      //   title: "Dashboards",
      //   root: true,
      //   alignment: "left",
      //   page: "dashboard",
      //   translate: "MENU.DASHBOARD"
      // },
      // {
      //   title: "Material UI",
      //   root: true,
      //   alignment: "left",
      //   toggle: "click",
      //   submenu: [
      //     {
      //       title: "Layout",
      //       bullet: "dot",
      //       submenu: [
      //         {
      //           title: "Box",
      //           bullet: "line",
      //           page: "google-material/layout/box",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Navigation",
      //       bullet: "dot",
      //       submenu: [
      //         {
      //           title: "Bottom Navigation",
      //           bullet: "line",
      //           page: "google-material/navigation/bottom-navigation",
      //         },
      //         {
      //           title: "Breadcrumbs",
      //           bullet: "line",
      //           page: "google-material/navigation/breadcrumbs",
      //         },
      //         {
      //           title: "Drawers",
      //           bullet: "line",
      //           page: "google-material/navigation/drawer",
      //         },
      //         {
      //           title: "Links",
      //           bullet: "line",
      //           page: "google-material/navigation/links",
      //         },
      //         {
      //           title: "Menus",
      //           bullet: "line",
      //           page: "google-material/navigation/menus",
      //         },
      //         {
      //           title: "Steppers",
      //           bullet: "line",
      //           page: "google-material/navigation/steppers",
      //         },
      //         {
      //           title: "Tabs",
      //           bullet: "line",
      //           page: "google-material/navigation/tabs",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Surfaces",
      //       bullet: "dot",
      //       submenu: [
      //         {
      //           title: "App Bar",
      //           bullet: "line",
      //           page: "google-material/surfaces/app-bar",
      //         },
      //         {
      //           title: "Paper",
      //           bullet: "line",
      //           page: "google-material/surfaces/paper",
      //         },
      //         {
      //           title: "Cards",
      //           bullet: "line",
      //           page: "google-material/surfaces/cards",
      //         },
      //         {
      //           title: "Expansion Panels",
      //           bullet: "line",
      //           page: "google-material/surfaces/expansion-panels",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Feedback",
      //       bullet: "dot",
      //       submenu: [
      //         {
      //           title: "Progress",
      //           bullet: "line",
      //           page: "google-material/feedback/progress",
      //         },
      //         {
      //           title: "Dialogs",
      //           bullet: "line",
      //           page: "google-material/feedback/dialogs",
      //         },
      //         {
      //           title: "Snackbars",
      //           bullet: "line",
      //           page: "google-material/feedback/snackbars",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Data Display",
      //       bullet: "dot",
      //       submenu: [
      //         {
      //           title: "Avatars",
      //           bullet: "line",
      //           page: "google-material/data-displays/avatars",
      //         },
      //         {
      //           title: "Badges",
      //           bullet: "line",
      //           page: "google-material/data-displays/badges",
      //         },
      //         {
      //           title: "Chips",
      //           bullet: "line",
      //           page: "google-material/data-displays/chips",
      //         },
      //         {
      //           title: "Dividers",
      //           bullet: "line",
      //           page: "google-material/data-displays/dividers",
      //         },
      //         {
      //           title: "Icons",
      //           bullet: "line",
      //           page: "google-material/data-displays/icons",
      //         },
      //         {
      //           title: "Lists",
      //           bullet: "line",
      //           page: "google-material/data-displays/lists",
      //         },
      //         {
      //           title: "Tables",
      //           bullet: "line",
      //           page: "google-material/data-displays/tables",
      //         },
      //         {
      //           title: "Tooltips",
      //           bullet: "line",
      //           page: "google-material/data-displays/tooltips",
      //         },
      //         {
      //           title: "Typography",
      //           bullet: "line",
      //           page: "google-material/data-displays/typography",
      //         },
      //       ],
      //     },
      //     {
      //       title: "Utils",
      //       bullet: "dot",
      //       submenu: [
      //         {
      //           title: "Click Away Listener",
      //           bullet: "line",
      //           page: "google-material/utils/click-away-listener",
      //         },
      //         {
      //           title: "Modal",
      //           bullet: "line",
      //           page: "google-material/utils/modal",
      //         },
      //         {
      //           title: "No SSR",
      //           bullet: "line",
      //           page: "google-material/utils/no-ssr",
      //         },
      //         {
      //           title: "Popover",
      //           bullet: "line",
      //           page: "google-material/utils/popover",
      //         },
      //         {
      //           title: "Popper",
      //           bullet: "line",
      //           page: "google-material/utils/popper",
      //         },
      //         {
      //           title: "Portal",
      //           bullet: "line",
      //           page: "google-material/utils/portal",
      //         },
      //         {
      //           title: "Transitions",
      //           bullet: "line",
      //           page: "google-material/utils/transitions",
      //         },
      //         {
      //           title: "useMediaQuery",
      //           bullet: "line",
      //           page: "google-material/utils/use-media-query",
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
  aside: {
    self: {},
    items: [
      // {
      //   title: "Dashboard",
      //   root: true,
      //   icon: "flaticon2-architecture-and-city",
      //   page: "dashboard",
      //   translate: "MENU.DASHBOARD",
      //   bullet: "dot",
      // },
      { section: "Facturación" },
      {
        title: "Factura",
        root: true,
        bullet: "dot",
        icon: "flaticon2-browser-2",
        submenu: [
          {
            title: "Facturar",
            bullet: "dot",
            submenu: [
              {
                title: "Lista de Facturas",
                page: "billing/list",
              },
              {
                title: "Nueva Factura",
                page: "billing",
              },
              {
                title: "Editar Factura",
                page: "billing",
              },
            ],
          },
        ],
      },
      { section: "Inventario" },
      {
        title: "Productos",
        root: true,
        bullet: "dot",
        icon: "flaticon2-browser-2",
        submenu: [
          {
            title: "Producto",
            bullet: "dot",
            submenu: [
              {
                title: "Lista de productos",
                page: "product/list",
              },
              {
                title: "Editar Producto",
                page: "product/form",
              },
            ],
          },
        ],
      },

    ],
  },
  
};
