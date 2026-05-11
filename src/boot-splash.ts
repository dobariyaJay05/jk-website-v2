import { DotLottie } from "@lottiefiles/dotlottie-web";

let instance: DotLottie | null = null;

export function destroyBootSplash(): void {
  if (instance) {
    instance.destroy();
    instance = null;
  }
}

export function initBootSplash(): void {
  if (instance) return;
  const canvas = document.getElementById("jk-boot-dotlottie");
  if (!(canvas instanceof HTMLCanvasElement)) return;

  instance = new DotLottie({
    canvas,
    src: "/assets/Untitled%20file.lottie",
    loop: true,
    autoplay: true,
    layout: { fit: "contain", align: [0.5, 0.5] },
    renderConfig: { autoResize: true },
  });
}
