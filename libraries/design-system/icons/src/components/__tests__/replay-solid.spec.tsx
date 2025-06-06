import * as React from 'react'
import { cleanup, render, screen } from '@testing-library/react'

import ReplaySolid from '../replay-solid'

describe('ReplaySolid', () => {
    it('should render the icon without errors', async () => {
        render(<ReplaySolid data-testid='icon' />)

        const svgElement = screen.getByTestId('icon')

        expect(svgElement).toBeInTheDocument()

        cleanup()
    })
})
