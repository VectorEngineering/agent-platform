import { base64 } from '@playbookmedia/encoding'
import { BaseError, Err, Ok, type Result } from '@playbookmedia/error'

export class SerializationError extends BaseError {
    public readonly retry = false
    public readonly name = SerializationError.name
}

export class EncryptionKey {
    public readonly algorithm: 'AES-GCM'
    public readonly schemaVersion: 'v1'
    public readonly keyVersion: number
    public readonly random: string

    private constructor(opts: { algorithm: 'AES-GCM'; schemaVersion: 'v1'; keyVersion: number; random: string }) {
        this.algorithm = opts.algorithm
        this.schemaVersion = opts.schemaVersion
        this.keyVersion = opts.keyVersion
        this.random = opts.random
    }

    static new(opts: { keyVersion: 1 }): EncryptionKey {
        return new EncryptionKey({
            random: base64.encode(crypto.getRandomValues(new Uint8Array(64))),
            algorithm: 'AES-GCM',
            schemaVersion: 'v1',
            keyVersion: opts.keyVersion
        })
    }

    static fromString(s: string): Result<EncryptionKey, SerializationError> {
        const parts = s.split('_')
        const schemaVersion = parts[0]

        if (!schemaVersion || parts.length !== 4) {
            return Err(
                new SerializationError({
                    message: `unable to extract schema version: ${s}`
                })
            )
        }

        switch (schemaVersion) {
            case 'v1': {
                const [_, keyVersion, algorithm, random] = parts
                return Ok(
                    new EncryptionKey({
                        schemaVersion,
                        keyVersion: Number.parseInt(keyVersion),
                        // @ts-expect-error
                        algorithm,
                        random
                    })
                )
            }

            default:
                return Err(
                    new SerializationError({
                        message: `unable to deserialize version: ${schemaVersion}`
                    })
                )
        }
    }

    public toString(): string {
        switch (this.schemaVersion) {
            case 'v1':
                return [this.schemaVersion, this.keyVersion, this.algorithm, this.random].join('_')

            default:
                break
        }

        throw new Error(`unable to handle schemaVersion: ${this.schemaVersion}`)
    }
}
