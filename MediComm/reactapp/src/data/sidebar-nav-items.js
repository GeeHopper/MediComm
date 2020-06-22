export default function() {
  return [

    {
      title: "Mein Profil",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/me",
    },
    {
      title: "Nachrichten",
      htmlBefore: '<i class="material-icons">chat</i>',
      to: "/chat",
    },

    {
      title: "Meine Suche",
      htmlBefore: '<i class="material-icons">search</i>',
      to: "/searchoverview",
    },
    {
      title: "Therapie Übersicht",
      htmlBefore: '<i class="material-icons">house</i>',
      to: "/overviewtherapies",
    },
    {
      title: "Meine Dateien",
      htmlBefore: '<i class="material-icons">attach_file</i>',
      to: "/overviewmyfiles",
    },
    {
      title: "Datei hochladen",
      htmlBefore: '<i class="material-icons">cloud</i>',
      to: "/fileupload",
    },
    {
      title: "Sprachnachricht aufnehmen",
      htmlBefore: '<i class="material-icons">phone</i>',
      to: "/voice",
    },
    {
      title: "Foto aufnehmen",
      htmlBefore: '<i class="material-icons">camera</i>',
      to: "/picture",
    },
    {
      title: "Browse alle Ärzte",
      htmlBefore: '<i class="material-icons">search</i>',
      to: "/search?username=",
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
