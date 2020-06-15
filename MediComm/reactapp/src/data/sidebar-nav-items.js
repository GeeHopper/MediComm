export default function() {
  return [

    {
      title: "User Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    },
    {
      title: "Dokumente",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables",
    },

    {
      title: "Nachrichten",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/nachrichten",
    },

    {
      title: "Terminplan",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Medikamente",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors",
    }

    /*
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    */


  ];
}
