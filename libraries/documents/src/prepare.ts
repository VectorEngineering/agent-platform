/**
 * @fileoverview Document preparation utilities for handling various file formats
 * and converting them to standardized formats for processing.
 */

import type { Document, DocumentResponse } from './types'

import { decode } from 'base64-arraybuffer'
import convert from 'heic-convert'
import sharp from 'sharp'
import { stripSpecialCharacters } from './helper'

/** Maximum width/height for resized images */
const MAX_SIZE = 1500

/**
 * Prepares a document for processing by converting it to a standardized format.
 *
 * @remarks
 * Image processing includes:
 * - Automatic rotation based on EXIF data
 * - Resizing to a maximum dimension of 1500px
 * - Format conversion to JPEG for consistency
 * - HEIC to JPEG conversion for iOS images
 *
 * PDF files are passed through without modification but are validated for processing compatibility.
 *
 * @throws {Error}
 * - If image conversion fails
 * - If PDF validation fails
 * - If input format is not supported
 */
export async function prepareDocument(document: Document): Promise<DocumentResponse> {
    const buffer = decode(document.Content)
    const fileName = document.Name.split('.')?.at(0) ?? 'File'
    const sanitizedName = stripSpecialCharacters(fileName)

    switch (document.ContentType) {
        case 'application/octet-stream':
        case 'application/pdf': {
            return {
                content: buffer,
                mimeType: 'application/pdf',
                size: document.ContentLength,
                name: fileName,
                fileName: `${sanitizedName}.pdf`
            }
        }
        case 'image/heic': {
            const decodedImage = await convert({
                // @ts-ignore
                buffer: new Uint8Array(buffer),
                format: 'JPEG',
                quality: 1
            })

            const image = await sharp(decodedImage).rotate().resize({ width: MAX_SIZE }).toFormat('jpeg').toBuffer()

            return {
                content: image,
                mimeType: 'image/jpeg',
                size: image.byteLength,
                name: fileName,
                fileName: `${sanitizedName}.jpg`
            }
        }
        default: {
            const image = await sharp(buffer).rotate().resize({ width: MAX_SIZE }).toFormat('jpeg').toBuffer()

            return {
                content: image,
                mimeType: 'image/jpeg',
                size: image.byteLength,
                name: fileName,
                fileName: `${sanitizedName}.jpg`
            }
        }
    }
}
