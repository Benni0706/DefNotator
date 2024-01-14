import random from "random";

export function username2initials(username: string) {
    return Array.from(username.matchAll(/\b\w/g)).join("").toUpperCase();
}

export function generateAvatar(text: string) {
    const rand = random.clone(text);  // random number generator seeded with the text for same results

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    canvas.width = 200;
    canvas.height = 200;

    // Draw background
    context.fillStyle = `#${rand.int(0, 0xFFFFFF).toString(16).padStart(6, '0')}`;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 100px Assistant";
    context.fillStyle = `#${rand.int(0, 0xFFFFFF).toString(16).padStart(6, '0')}`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
}
