export class Tile {
    tileElement: HTMLElement;
    value: string;
    x: number;
    y: number;

    constructor(gridElement: HTMLElement) {
        this.tileElement = document.createElement('div');
        this.tileElement.classList.add('tile');

        this.setValue(String(Math.random() > 0.5 ? 2 : 4));

        gridElement.appendChild(this.tileElement);
    }

    setXY(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.tileElement.style.setProperty('--x', `${x}`);
        this.tileElement.style.setProperty('--y', `${y}`);
    }

    setValue(value: string) {
        this.value = value;
        this.tileElement.textContent = this.value;

        const bgLightness = 100 - Math.log2(Number(value)) * 9;
        this.tileElement.style.setProperty('--bg-lightness', `${bgLightness}%`);
        this.tileElement.style.setProperty('--tex-lightness', `${bgLightness < 50 ? 90 : 10}%`);
    }

    removeFromDOM() {
        this.tileElement.remove();
    }

    waitForTransitionEnd(): Promise<any> {
        return new Promise((resolve) => {
            this.tileElement.addEventListener('transitionend', resolve, { once: true });
        });
    }

    waitForAnimationEnd(): Promise<any> {
        return new Promise((resolve) => {
            this.tileElement.addEventListener('animationend', resolve, { once: true });
        });
    }
}
