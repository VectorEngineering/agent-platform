import * as React from 'react'
import type { IconProps } from '../types'
const Keyboard = React.forwardRef<SVGSVGElement, IconProps>(({ color = 'currentColor', ...props }, ref) => {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={15} height={15} fill='none' ref={ref} {...props}>
            <g fill={color} clipPath='url(#a)'>
                <path d='M4.746 10.75a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75M6.052 7.861h.444c.246 0 .445.2.445.445v.444a.444.444 0 0 1-.445.445h-.444a.444.444 0 0 1-.445-.445v-.444c0-.246.2-.445.445-.445M4.052 7.861h-.445a.444.444 0 0 0-.444.445v.444c0 .246.199.445.444.445h.445a.444.444 0 0 0 .444-.445v-.444a.444.444 0 0 0-.444-.445M8.496 7.861h.445c.245 0 .444.2.444.445v.444a.444.444 0 0 1-.444.445h-.445a.444.444 0 0 1-.444-.445v-.444c0-.246.199-.445.444-.445M11.385 7.861h-.444a.444.444 0 0 0-.445.445v.444c0 .246.2.445.444.445h.445a.444.444 0 0 0 .444-.445v-.444a.444.444 0 0 0-.444-.445M4.83 6.084h.444c.245 0 .444.198.444.444v.444a.444.444 0 0 1-.444.445h-.445a.444.444 0 0 1-.444-.445v-.444c0-.246.199-.444.444-.444M7.718 6.084h-.444a.444.444 0 0 0-.445.444v.444c0 .246.2.445.445.445h.444a.444.444 0 0 0 .445-.445v-.444a.444.444 0 0 0-.445-.444M9.718 6.084h.445c.245 0 .444.198.444.444v.444a.444.444 0 0 1-.444.445h-.445a.444.444 0 0 1-.444-.445v-.444c0-.246.199-.444.444-.444' />
                <path
                    fillRule='evenodd'
                    d='M12.817.964a.75.75 0 0 0-1.438-.428.805.805 0 0 1-.772.575H9.052c-1.245 0-2.26.988-2.304 2.223H2.829A2.53 2.53 0 0 0 .302 5.86v5.778a2.53 2.53 0 0 0 2.527 2.528h9.334a2.53 2.53 0 0 0 2.528-2.528V5.861a2.53 2.53 0 0 0-2.528-2.527H8.25a.806.806 0 0 1 .802-.723h1.555a2.305 2.305 0 0 0 2.21-1.647M7.49 4.834h4.672c.568 0 1.028.46 1.028 1.027v5.778c0 .568-.46 1.028-1.027 1.028H2.829c-.567 0-1.027-.46-1.027-1.028V5.861c0-.567.46-1.027 1.027-1.027z'
                    clipRule='evenodd'
                />
            </g>
            <defs>
                <clipPath id='a'>
                    <path fill='#fff' d='M0 0h15v15H0z' />
                </clipPath>
            </defs>
        </svg>
    )
})
Keyboard.displayName = 'Keyboard'
export default Keyboard
