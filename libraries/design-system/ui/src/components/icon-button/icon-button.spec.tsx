import * as React from 'react'

import { render, screen } from '@testing-library/react'

import { IconButton } from './icon-button'
import { Plus } from '@playbookmedia/icons'

describe('IconButton', () => {
    it('renders a IconButton', () => {
        render(
            <IconButton>
                <Plus />
            </IconButton>
        )
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })

    it('renders a button as a link', () => {
        render(
            <IconButton asChild>
                <a href='https://www.medusajs.com'>
                    <Plus />
                </a>
            </IconButton>
        )

        const button = screen.getByRole('link')
        expect(button).toBeInTheDocument()
    })
})
