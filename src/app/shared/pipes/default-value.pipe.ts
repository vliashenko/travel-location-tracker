import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'default',
    standalone: true
})
export class DefaultValuePipe implements PipeTransform {
    transform<T>(value: T | null | undefined, fallback: string = 'N/A'): T | string {
        if (value === null || value === undefined || value === '') {
            return fallback;
        }
        return value;
    }
}
