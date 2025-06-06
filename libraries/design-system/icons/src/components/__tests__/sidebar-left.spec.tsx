import * as React from 'react'
import { cleanup, render, screen } from '@testing-library/react'

import SidebarLeft from '../sidebar-left'

describe('SidebarLeft', () => {
    it('should render the icon without errors', async () => {
        render(<SidebarLeft data-testid='icon' />)

        const svgElement = screen.getByTestId('icon')

        expect(svgElement).toBeInTheDocument()

        cleanup()
    })
})
