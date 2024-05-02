import {visit} from "unist-util-visit"
import {h} from "hastscript"

export  function rehypeFigure(option) {
  const className = (option && option.className) || "rehype-figure"

  function buildFigure({ properties }) {
    const [alt, altClassName = "", figClassName = ""] = properties.alt.split("|", 3)
    console.log("sss", alt, altClassName, figClassName);
    const figure = h("figure", { class: className }, [
      h("img", { ...properties, class: altClassName.replace('_', ' ') }),
      alt && alt.trim().length > 0
        ? h("figcaption", { class: figClassName.replace('_', ' ') }, alt)
        : "",
    ])
    return figure
  }

  return function (tree) {
    visit(tree, { tagName: "p" }, (node, index) => {
      const images = node.children
        .filter((n) => n.tagName === "img")
        .map((img) => buildFigure(img))

      if (images.length === 0) return

      tree.children[index] =
        images.length === 1
          ? images[0]
          : (tree.children[index] = h(
            "div",
            { class: `${className}-container` },
            images
          ))
    })
  }
}

