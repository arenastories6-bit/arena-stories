import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getTurfData } from "./turf.functions-gWESyUwD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bh8QjndX.js
var $$splitNotFoundComponentImporter = () => import("./routes-DlpO2MX4.mjs");
var $$splitErrorComponentImporter = () => import("./routes-Cgo6CHNd.mjs");
var $$splitComponentImporter = () => import("./routes-BSlN2VN0.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Arena Stories — Book Premium Box Cricket Pitches" },
		{
			name: "description",
			content: "Find live box cricket slot availability, choose your arena, and confirm your match in seconds. Every match, a new story."
		},
		{
			property: "og:title",
			content: "Arena Stories — Book Premium Box Cricket Pitches"
		},
		{
			property: "og:description",
			content: "Live slots. Premium pitches. Instant booking confirmation."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	loader: () => getTurfData(),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
