import { ReactNode, useEffect, useRef } from 'react';
import ChevronBottomTriangleIcon from '../Icons/ChevronBottomTriangleIcon';
import useWindowSize from '@/hooks/useWindowSize';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';

interface ISwiperHorizontalProps {
    children: ReactNode;
    arrow?: boolean;
    scrollStepSize?: number;
    arrowClassName?: string;
    arrowSuffix?: ReactNode;
}
const SwiperHorizontal = ({ children, arrow, scrollStepSize = 120, arrowClassName, arrowSuffix }: ISwiperHorizontalProps) => {
    const { width } = useWindowSize();
    const mouseDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const startY = useRef(0);
    const scrollTop = useRef(0);
    const wrapper = useRef<HTMLDivElement>(null);
    const handleClick = useRef(true);
    // const btnLeft = useRef<HTMLButtonElement>();
    const btnRight = useRef<HTMLButtonElement>();

    const startDragging = (e: { pageX: number; pageY: number; }) => {
        if (!wrapper.current) return;
        wrapper.current.classList.add('cursor-grabbing');
        mouseDown.current = true;
        startX.current = e.pageX - wrapper.current.offsetLeft;
        scrollLeft.current = wrapper.current.scrollLeft;

        startY.current = e.pageY - wrapper.current.offsetTop;
        scrollTop.current = wrapper.current.scrollTop;
        handleClick.current = true;
    };

    const stopDragging = () => {
        if (!wrapper.current) return;
        wrapper.current.classList.remove('cursor-grabbing');
        mouseDown.current = false;
    };

    const onDrag = (e: { pageX: number; pageY: number; preventDefault: () => void; }) => {
        e.preventDefault();
        if (!mouseDown.current || !wrapper.current) return;
        const x = e.pageX - wrapper.current.offsetLeft;
        const scroll = x - startX.current;
        wrapper.current.scrollLeft = scrollLeft.current - scroll;

        const y = e.pageY - wrapper.current.offsetTop;
        const scrollY = y - startY.current;
        wrapper.current.scrollTop = scrollTop.current - scrollY;
        handleClick.current = false;
        // setVisibleArrow();
    };

    // useEffect(() => {
    //     setVisibleArrow();
    // }, [width]);

    useEffect(() => {
        if (wrapper.current) {
            wrapper.current.addEventListener('mousemove', onDrag);
            wrapper.current.addEventListener('mousedown', startDragging, false);
            wrapper.current.addEventListener('mouseup', stopDragging, false);
            wrapper.current.addEventListener('mouseleave', stopDragging, false);
        }
        return () => {
            if (wrapper.current) {
                wrapper.current.removeEventListener('mousemove', onDrag);
                wrapper.current.removeEventListener('mousedown', startDragging, false);
                wrapper.current.removeEventListener('mouseup', stopDragging, false);
                wrapper.current.removeEventListener('mouseleave', stopDragging, false);
            }
        };
    }, [wrapper.current]);

    /**
     * 
     * @desc uncomment for handle visible arrow
     */

    // const setVisibleArrow = (left?: number) => {
    //     if (!wrapper.current) return;
    //     const scrollLeft = left ?? wrapper.current.scrollLeft;
    //     const isMaxScroll = wrapper.current.offsetWidth + scrollLeft >= wrapper.current.scrollWidth - 1;
    //     if (arrow) {
    //         btnLeft.current.classList[scrollLeft > 0 ? 'remove' : 'add']('invisible', 'pointer-events-none');
    //         btnRight.current.classList[!isMaxScroll ? 'remove' : 'add']('invisible', 'pointer-events-none');
    //     }
    // };

    const onScroll = (scrollStep: number) => {
        if (!wrapper.current) return;
        console.log('click');
        const scrollLeft = wrapper.current?.scrollLeft + scrollStep;
        wrapper.current?.scrollTo({
            left: scrollLeft,
            behavior: 'smooth',
        });
        // setVisibleArrow(scrollLeft);
    };

    return (
        <div className="relative flex items-center overflow-auto no-scrollbar">
            {/* {arrow && (
                <div onClick={() => onScroll(-scrollStepSize)} ref={btnLeft} className="min-w-[1rem] cursor-pointer pointer-events-none">
                    <ChevronBottomTriangleIcon size={16} className="rotate-90" />
                </div>
            )} */}
            <div ref={wrapper}>
                {children}
            </div>
            {/* {arrow && (
                <Button onClick={() => onScroll(scrollStepSize)} ref={btnRight} className={clsx("min-w-[3rem] !cursor-pointer !sticky w-17 flex items-center z-30 bg-white rounded-full outline-none focus:outline-none", arrowClassName)}>
                    <ChevronBottomTriangleIcon size={16} className="-rotate-90" />
                </Button>
            )} */}
        </div>
    );
};

export default SwiperHorizontal;
