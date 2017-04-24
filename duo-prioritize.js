// the whole thing needs to be injected on the page as a string
// otherwise it executes in an isolated context and can't access variables likes `duo`
wrapper_string = function () {

var PriorityExtension;
PriorityExtension = PriorityExtension || {};

PriorityExtension.settings = {
  locale: "en",
  maximum: 4,

  h2_css: { "margin-bottom": "10px" },
  needs_strengthening_skill_css: { "margin-top": "30px", "opacity": "1" },
  new_skill_css: { "margin-top": "10px", "opacity": "1" },

  minLevel: 1,
  maxLevel: 4
};

PriorityExtension.text = {
  loading: { en: "Loading..." },
  all_good: { en: "All skills are strengthened!" },
  list_skills: { en: "Skills that need strengthening" },
  no_new_skills: { en: "No new skills" },
  new_skills: { en: "New skills" }
};

PriorityExtension.translate = function (key) {
  return PriorityExtension.text[key][PriorityExtension.settings.locale];
};

PriorityExtension.appendSkillsThatNeedStrengthening = function (args) {
  var maximum = PriorityExtension.settings.maximum;
  var ii, skills;

  for (ii = PriorityExtension.settings.minLevel; ii <= PriorityExtension.settings.maxLevel; ii += 1) {
    skills = $("span.strength-" + ii.toString()).parent().parent().slice(0, maximum).clone();
    skills.css(PriorityExtension.settings.needs_strengthening_skill_css).removeClass("fade-this-in");
    maximum -= skills.length;

    args.box.append(skills.clone());

    if (maximum === 0) break;
  }

  if (maximum === PriorityExtension.settings.maximum) {
    args.h2.text(PriorityExtension.translate("all_good"));
  } else {
    args.h2.text(PriorityExtension.translate("list_skills"));
  }
};

PriorityExtension.appendNewSkills = function (args) {
  var maximum = PriorityExtension.settings.maximum;
  var skills;

  skills = $(".unlocked").parent().filter(function () { return $(this).find(".lessons-left:not(:empty)").length; }).clone();
  skills.css(PriorityExtension.settings.new_skill_css).removeClass("fade-this-in");
  args.box.append(skills.clone());

  if (skills.length === 0) {
    args.h2.text(PriorityExtension.translate("no_new_skills"));
  } else {
    args.h2.text(PriorityExtension.translate("new_skills"));
  }
};

PriorityExtension.valid = function () {
  return (duo.user.get("learning_language") && duo.view === "home");
};


PriorityExtension.create = function () {
  var createBox = function (prefix) {
    var h2 = $("<h2>", { text: PriorityExtension.translate("loading"), id: prefix + "-title" }).css(PriorityExtension.settings.h2_css);
    var box = $("<div>", { id: prefix + "-box", class: "box-colored bg-white" }).append(h2);
    $("#priority-extension-box").remove();
    $(".page-sidebar").prepend(box);

    return { box: box, h2: h2 };
  };

  if (PriorityExtension.valid()) {
    PriorityExtension.appendNewSkills(createBox("priority-extension-new"));
    PriorityExtension.appendSkillsThatNeedStrengthening(createBox("priority-extension-needs-strengthening"));
  }
};

$(document).ready(function () {
  PriorityExtension.create();

  // Backbone.js
  // I'm not an expert on Backbone but this seems to always show the box:
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

return PriorityExtension;

}.toString();

(function () {
  var script_tag = document.createElement("script");
  var text = document.createTextNode("var PriorityExtension = (" + wrapper_string + ")();");

  script_tag.appendChild(text);
  document.body.appendChild(script_tag);
})();
