class Dashboard {
  constructor(me, editor, library) {
    this.me = me;
    this.editor = editor;
    this.lib = library;
    this.libString = JSON.stringify(library);
    this.init();
  }
  init() {
    this.loadDashboard();
  }
  displayBookmark(obj, id) {
    let bookmark = assignAttributes(document.createElement("a"), {
      class: `bookmark`,
      id: `bk${id}`,
      href: obj.url
    });
    let image = assignAttributes(document.createElement("img"), {
      src: obj.imgurl,
      height: "48",
      width: "48",
      title: obj.name
    });
    bookmark.appendChild(image);
    this.me.appendChild(bookmark);
  }
  removeBookmark(element) {
    let index = element.getAttribute("id").replace("bk", "");
    this.lib.splice(parseInt(index), 1);
    this.loadDashboard();
    return index;
  }
  loadDashboard() {
    this.me.innerHTML = "";
    for (let b in this.lib) {
      let obj = this.lib[b];
      if (obj.url) {
        let url = cleanUrl(obj.url);
        let name = obj.name ? obj.name : obj.url;
        let logo = obj.imgurl ? obj.imgurl : icoUrl(obj.url);
        this.displayBookmark(
          {
            url: url,
            name: name,
            imgurl: logo
          },
          b
        );
      }
    }
    this.updateLayout();
  }
  setLibrary(obj) {
    if (Array.isArray(obj)) this.lib = obj;
    this.loadDashboard();
  }
  updateLayout() {
    let l = this.lib.length;
    let x = 0;
    switch (true) {
      case l <= 1:
        x = 1;
        break;
      case l <= 4:
        x = 2;
        break;
      case l <= 9:
        x = 3;
        break;
      case l <= 12:
        x = 4;
        break;
      default:
        x = Math.ceil(l / 3);
    }
    document.documentElement.style.setProperty("--col", `repeat(${x},1fr)`);
  }
}
