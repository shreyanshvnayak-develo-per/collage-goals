(() => {
  const { REPO, BRANCH, skills } = window.TENSOR;
  const app = document.getElementById("app");
  const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
  const total = String(skills.length).padStart(2, "0");
  document.getElementById("gh-link").href = `https://github.com/${REPO}`;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");

  // ---------- tiny markdown renderer (enough for SKILL.md) ----------
  function inline(s) {
    s = esc(s);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
    s = s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    return s;
  }
  function renderMarkdown(src) {
    const lines = src.replace(/\r/g, "").split("\n");
    let html = "", i = 0;
    const isTableSep = (l) => /^\s*\|?\s*:?-{3,}/.test(l) && l.includes("|");
    const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
    while (i < lines.length) {
      const l = lines[i];
      if (/^```/.test(l)) {
        const buf = []; i++;
        while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
        i++;
        html += `<pre><code>${esc(buf.join("\n"))}</code></pre>`;
        continue;
      }
      const h = l.match(/^(#{1,4})\s+(.*)$/);
      if (h) { const n = h[1].length; html += `<h${n}>${inline(h[2])}</h${n}>`; i++; continue; }
      if (l.includes("|") && i + 1 < lines.length && isTableSep(lines[i + 1])) {
        const head = cells(l); i += 2;
        let rows = "";
        while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
          rows += "<tr>" + cells(lines[i]).map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>"; i++;
        }
        html += `<table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table>`;
        continue;
      }
      if (/^>\s?/.test(l)) {
        const buf = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ""));
        html += `<blockquote><p>${inline(buf.join(" "))}</p></blockquote>`;
        continue;
      }
      if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
        const ordered = /^\s*\d+\./.test(l);
        const items = [];
        while (i < lines.length && (/^\s*([-*]|\d+\.)\s+/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
          if (/^\s*([-*]|\d+\.)\s+/.test(lines[i]) && !/^\s{2,}/.test(lines[i])) {
            items.push({ text: lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ""), sub: [] });
          } else {
            items[items.length - 1].sub.push(lines[i].trim().replace(/^([-*]|\d+\.)\s+/, ""));
          }
          i++;
        }
        const tag = ordered ? "ol" : "ul";
        html += `<${tag}>` + items.map((it) =>
          `<li>${inline(it.text)}${it.sub.length ? "<ul>" + it.sub.map((s) => `<li>${inline(s)}</li>`).join("") + "</ul>" : ""}</li>`
        ).join("") + `</${tag}>`;
        continue;
      }
      if (!l.trim()) { i++; continue; }
      const buf = [];
      while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|>|\s*([-*]|\d+\.)\s)/.test(lines[i]) && !(lines[i].includes("|") && isTableSep(lines[i + 1] || ""))) buf.push(lines[i++]);
      html += `<p>${inline(buf.join(" "))}</p>`;
    }
    return html;
  }
  function splitFrontmatter(src) {
    const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
    return m ? { fm: m[1], body: src.slice(m[0].length) } : { fm: "", body: src };
  }

  // ---------- skill source loading (local first, then GitHub raw) ----------
  const cache = {};
  async function loadSkill(slug) {
    if (cache[slug]) return cache[slug];
    const urls = [`skills/${slug}/SKILL.md`, `${RAW}/skills/${slug}/SKILL.md`];
    for (const u of urls) {
      try {
        const r = await fetch(u);
        if (r.ok) return (cache[slug] = await r.text());
      } catch (_) { /* try next */ }
    }
    throw new Error("could not load SKILL.md");
  }

  // ---------- install commands ----------
  const installOne = (slug) =>
    `mkdir -p ~/.claude/skills/${slug} && \\\n  curl -fsSL ${RAW}/skills/${slug}/SKILL.md \\\n  -o ~/.claude/skills/${slug}/SKILL.md`;
  const installAll = () =>
    `git clone https://github.com/${REPO}.git tensor && cd tensor && ./install.sh`;

  function copyBox(text) {
    return `<div class="install-box">${esc(text)}<button class="copy" data-copy="${esc(text)}">copy</button></div>`;
  }
  document.addEventListener("click", async (e) => {
    const b = e.target.closest(".copy");
    if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy); } catch (_) {}
    b.textContent = "copied ✓"; b.classList.add("done");
    setTimeout(() => { b.textContent = "copy"; b.classList.remove("done"); }, 1400);
  });

  // ---------- views ----------
  function cell(n, body, kind = "in") {
    const label = kind === "in" ? `In [${n}]:` : `Out[${n}]:`;
    return `<div class="cell"><div class="prompt ${kind}">${label}</div><div class="cell-body">${body}</div></div>`;
  }

  function home() {
    const cards = skills.map((s, i) => `
      <a class="card" href="#/skill/${s.slug}">
        <div class="card-meta"><span>${pad(i + 1)}/${total}</span><span class="cat">${esc(s.cat)}</span><span>${esc(s.read)}</span></div>
        <div class="card-title"><span class="icon">${esc(s.icon)}</span><h3>/${esc(s.slug)}</h3></div>
        <p class="tag-line">${esc(s.tagline)}</p>
        <div class="chips">${s.tags.slice(0, 4).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      </a>`).join("");

    app.innerHTML = `
      <section class="fade-in">
        ${cell(1, `<div class="code"><span class="kw">import</span> tensor <span class="kw">as</span> tf <span class="cm"># not that one 😉</span></div>`)}
        ${cell(1, `
          <h1 class="hero-title">TENSOR</h1>
          <p class="hero-sub"><b>Claude Code skills for CS/IT placements.</b> Coaching for DSA patterns, a GitHub glow-up, hireable projects, a defence round on your own code and core-subject vivas. They run inside your terminal, on <b>your</b> code.</p>
          <div class="shape">tensor.shape → <b>(${skills.length} skills, ∞ practice, 0 fluff)</b></div>
          <div class="cta-row">
            <a class="btn primary" href="#/install">▶ Run all cells — install</a>
            <a class="btn" href="#/skill/${skills[0].slug}">/${skills[0].slug} →</a>
          </div>`, "out")}
        ${cell(2, `<div class="code">tf.<span class="fn">list_skills</span>(<span class="str">"placements"</span>)</div>`)}
        ${cell(2, `<div class="grid">${cards}</div>`, "out")}
        ${cell(3, `<div class="code"><span class="cm"># how it works</span><br>
<span class="num">1</span>. install a skill into <span class="str">~/.claude/skills/</span><br>
<span class="num">2</span>. open Claude Code inside your project folder<br>
<span class="num">3</span>. type <span class="fn">/pattern-coach</span>, <span class="fn">/core-viva os</span>, <span class="fn">/defend-my-project</span> …</div>`)}
      </section>`;
  }

  function demoHTML(s) {
    return `<div class="term"><div class="term-bar"><i></i><i></i><i></i><span>~/placements — claude</span></div><div class="term-body" id="term"></div></div>`;
  }
  let typingTimer = null;
  function playDemo(lines) {
    const el = document.getElementById("term");
    if (!el) return;
    clearTimeout(typingTimer);
    el.innerHTML = "";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let li = 0;
    const caret = document.createElement("span"); caret.className = "caret";
    const next = () => {
      if (!document.body.contains(el)) return;
      if (li >= lines.length) { const d = document.createElement("div"); d.className = "term-line t-cmd"; d.appendChild(caret); el.appendChild(d); return; }
      const [kind, text] = lines[li++];
      const div = document.createElement("div");
      div.className = `term-line t-${kind}`;
      el.appendChild(div);
      div.appendChild(caret);
      if (kind === "cmd" || kind === "you") {
        if (reduce) { setLine(div, kind, text); return void (typingTimer = setTimeout(next, 0)); }
        let c = 0;
        const type = () => {
          if (!document.body.contains(el)) return;
          setLine(div, kind, text.slice(0, ++c));
          if (c < text.length) typingTimer = setTimeout(type, 22 + Math.random() * 30);
          else typingTimer = setTimeout(next, 450);
        };
        type();
      } else {
        setLine(div, kind, text);
        typingTimer = setTimeout(next, reduce ? 0 : 380);
      }
    };
    next();
  }
  function setLine(div, kind, text) {
    const caret = div.querySelector(".caret");
    if (kind === "cmd") div.innerHTML = esc(text).replace(/^(\/[\w-]+)/, '<span class="slash">$1</span>');
    else div.textContent = text;
    if (caret) div.appendChild(caret);
  }

  async function detail(slug) {
    const idx = skills.findIndex((s) => s.slug === slug);
    if (idx < 0) return notFound();
    const s = skills[idx];
    const prev = skills[(idx - 1 + skills.length) % skills.length];
    const next = skills[(idx + 1) % skills.length];

    app.innerHTML = `
      <section class="fade-in">
        <div class="crumbs"><a href="#/">skills</a> / ${esc(s.cat)} / ${pad(idx + 1)}/${total} · ${esc(s.read)}</div>
        <div class="detail-title"><span class="icon">${esc(s.icon)}</span><h1>/${esc(s.slug)}</h1></div>
        <p class="lead">${esc(s.tagline)}</p>
        <p class="blurb">${esc(s.blurb)}</p>
        <div class="chips" style="margin:10px 0 6px">${s.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>

        <h2 class="section-h">See it in action</h2>
        ${demoHTML(s)}

        <h2 class="section-h">Install</h2>
        ${copyBox(installOne(s.slug))}
        <p class="dim" style="font-family:var(--mono);font-size:12.5px">then open Claude Code in any project and type <span style="color:var(--yellow)">/${esc(s.slug)}</span></p>

        <h2 class="section-h">SKILL.md</h2>
        <div id="skill-src"><div class="md"><p class="dim">loading SKILL.md…</p></div></div>

        <div class="pager">
          <a href="#/skill/${prev.slug}"><span class="dir">← previous</span>/${esc(prev.slug)}</a>
          <a class="next" href="#/skill/${next.slug}"><span class="dir">next →</span>/${esc(next.slug)}</a>
        </div>
      </section>`;
    window.scrollTo(0, 0);
    playDemo(s.demo);

    try {
      const src = await loadSkill(slug);
      const { fm, body } = splitFrontmatter(src);
      const fmHTML = fm
        ? `<div class="frontmatter">---\n${esc(fm).replace(/^(\w+):/gm, '<span class="k">$1</span>:')}\n---</div>`
        : "";
      const target = document.getElementById("skill-src");
      if (target) target.innerHTML = `<div class="md">${fmHTML}${renderMarkdown(body)}</div>`;
    } catch (_) {
      const target = document.getElementById("skill-src");
      if (target) target.innerHTML = `<div class="md"><p>Couldn't load the file here. <a href="https://github.com/${REPO}/blob/${BRANCH}/skills/${slug}/SKILL.md" target="_blank" rel="noopener">View SKILL.md on GitHub ↗</a></p></div>`;
    }
  }

  function install() {
    app.innerHTML = `
      <section class="fade-in">
        <div class="crumbs"><a href="#/">skills</a> / install</div>
        <div class="detail-title"><span class="icon">▶</span><h1>Run all cells</h1></div>
        <p class="lead">Every skill is one <code style="font-family:var(--mono);color:var(--yellow)">SKILL.md</code> file. Claude Code loads the skills from <code style="font-family:var(--mono);color:var(--yellow)">~/.claude/skills/</code>.</p>

        <h2 class="section-h">All ${skills.length} skills</h2>
        ${copyBox(installAll())}

        <h2 class="section-h">Just one</h2>
        ${skills.map((s) => `<p style="font-family:var(--mono);font-size:13px;margin:14px 0 6px"><a href="#/skill/${s.slug}">/${esc(s.slug)}</a> <span class="dim">— ${esc(s.tagline)}</span></p>${copyBox(installOne(s.slug))}`).join("")}

        <h2 class="section-h">Project-only install</h2>
        <p class="blurb">Want a skill to apply only inside one repo? Copy its folder into <code style="font-family:var(--mono);color:var(--yellow)">.claude/skills/</code> in that project and commit it. Your whole team gets it.</p>
        ${copyBox(`./install.sh --project /path/to/your/repo`)}
      </section>`;
    window.scrollTo(0, 0);
  }

  function notFound() {
    app.innerHTML = `<section class="fade-in">${cell("*", `<div class="code" style="border-left-color:var(--red)"><span style="color:var(--red)">KeyError</span>: page not found — <a href="#/">back to skills</a></div>`, "out")}</section>`;
  }

  function route() {
    const h = location.hash.replace(/^#/, "") || "/";
    const m = h.match(/^\/skill\/([\w-]+)/);
    if (m) return detail(m[1]);
    if (h.startsWith("/install")) return install();
    if (h === "/" || h === "") return home();
    notFound();
  }
  window.addEventListener("hashchange", route);
  route();

  // ---------- background: drifting neural-net nodes ----------
  const cv = document.getElementById("bg");
  const ctx = cv.getContext("2d");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let W, H, nodes;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    const count = Math.round(Math.min(70, (innerWidth * innerHeight) / 22000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .25 * dpr, vy: (Math.random() - .5) * .25 * dpr,
      r: (Math.random() * 1.6 + .6) * dpr,
    }));
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    const max = 150 * (window.devicePixelRatio || 1);
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
        const d = Math.hypot(dx, dy);
        if (d < max) {
          ctx.strokeStyle = `rgba(75,139,190,${(1 - d / max) * .35})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(nodes[a].x, nodes[a].y); ctx.lineTo(nodes[b].x, nodes[b].y); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.fillStyle = "rgba(255,212,59,.55)";
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  addEventListener("resize", resize);
  resize(); tick();
})();
