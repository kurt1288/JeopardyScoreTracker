export function useSwipe(callbacks: {
    onLeft?: () => void;
    onRight?: () => void;
    onUp?: () => void;
    onDown?: () => void;
}) {
    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
        startX = e.targetTouches[0]?.clientX ?? 0;
        startY = e.targetTouches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (e: TouchEvent) => {
        const endX = e.changedTouches[0]?.clientX ?? 0;
        const endY = e.changedTouches[0]?.clientY ?? 0;

        const diffX = startX - endX;
        const diffY = startY - endY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (Math.abs(diffX) > 70) {
                diffX > 0 ? callbacks.onLeft?.() : callbacks.onRight?.();
            }
        } else {
            // Vertical swipe
            if (Math.abs(diffY) > 70) {
                diffY > 0 ? callbacks.onUp?.() : callbacks.onDown?.();
            }
        }
    };

    return { onTouchStart, onTouchEnd };
}
