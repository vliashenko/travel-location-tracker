import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fallbackImage',
    standalone: true
})
export class FallbackImagePipe implements PipeTransform {
    transform(url: string | null | undefined, defaultPath: string = '/public/placeholder.jpg'): string {
        return url && url.trim().length > 0 ? url : defaultPath;
    }
}
