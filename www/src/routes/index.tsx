import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  beforeLoad: () => ({ getTitle: () => "Home" }),
  component: Home,
});

function Home() {
  const [html, setHtml] = useState("");
  useEffect(() => {
    const fetchContent = async () => {
      const httpContent = await fetch(
        "/gst-portal/pages/apiportal/homepage.html",
      );
      let html = await httpContent.text();

      // Parse text to html
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Remove all img tags as we don't want to call more child api
      const imgTags = doc.getElementsByTagName("img");
      for (const imgTag of imgTags) {
        imgTag.remove();
      }

      html = doc.body.innerHTML;
      setHtml(html);
    };
    fetchContent();
  }, []);

  return (
    <div className="p-2">
      <div className="prose lg:prose-xl [&_a]:text-primary">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
