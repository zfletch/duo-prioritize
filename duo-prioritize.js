var PriorityExtension;
PriorityExtension = PriorityExtension || {};

PriorityExtension.settings = {
  locale: "en",
  maximum: 4,

  h2_css: { "margin-bottom": "10px" },
  skill_css: { "margin-top": "30px", "opacity": "1" },

  minLevel: 1,
  maxLevel: 4,
};

PriorityExtension.text = {
  loading: { en: "Loading..." },
  all_good: { en: "All skills are strengthened!" },
  list_skills: { en: "Skills that need strengthening" }
};

PriorityExtension.translate = function (key) {
  return PriorityExtension.text[key][PriorityExtension.settings.locale];
};

PriorityExtension.appendSkills = function (box, h2) {
  var maximum = PriorityExtension.settings.maximum;
  var ii, skills;

  for (ii = PriorityExtension.settings.minLevel; ii <= PriorityExtension.settings.maxLevel; ii += 1) {
    skills = $("span.strength-" + ii.toString()).parent().parent().slice(0, maximum).css(PriorityExtension.settings.skill_css).removeClass("fade-this-in");
    maximum -= skills.length;

    box.append(skills.clone());

    if (maximum === 0) break;
  }

  if (maximum === PriorityExtension.settings.maximum) {
    h2.text(PriorityExtension.translate("all_good"));
  } else {
    h2.text(PriorityExtension.translate("list_skills"));
  }
};

PriorityExtension.valid = function () {
  return (duo.user.get("learning_language") && duo.view === "home");
};


PriorityExtension.create = function () {
  if (PriorityExtension.valid()) {
    var h2 = $("<h2>", { text: PriorityExtension.translate("loading"), id: "priority-extension-title" }).css(PriorityExtension.settings.h2_css);
    var box = $("<div>", { id: "priority-extension-box", class: "box-colored bg-white" }).append(h2);
    $("#priority-extension-box").remove();
    $(".page-sidebar").prepend(box);

    PriorityExtension.appendSkills(box, h2);
  }
};

$(document).ready(function () {
  PriorityExtension.create();

  // Backbone.js
  // I'm not an expert on Backbone but this is the best I could do:
  //   - call .create() when the user changes their language
  //   - call .create() when the user navigates back to "home"
  //   - remove and add language change listener when user navigates back to "home"
  duo.user.on("change:learning_language", PriorityExtension.create);

  duo.userRouter.on("route", function(route, params) {
    if (route === "home") {
      PriorityExtension.create();

      duo.user.off("change:learning_language", PriorityExtension.create);
      duo.user.on("change:learning_language", PriorityExtension.create);
    }
  });
});
