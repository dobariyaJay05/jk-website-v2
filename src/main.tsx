import { initBootSplash, destroyBootSplash } from "./boot-splash";

initBootSplash();

void (async () => {
  const [{ StrictMode }, { createRoot }, { default: App }] = await Promise.all([
    import("react"),
    import("react-dom/client"),
    import("./App"),
  ]);
  await import("./styles/globals.css");

  destroyBootSplash();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})();
