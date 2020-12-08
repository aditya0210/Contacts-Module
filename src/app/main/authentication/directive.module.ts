import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlockCopyPasteDirective } from './blockDirective';
import { DndDirective } from './dragAndDrop.directive';

@NgModule({
    declarations: [
        BlockCopyPasteDirective,
        DndDirective

    ],
    exports: [
        BlockCopyPasteDirective,
        DndDirective
    ]
})
export class DirectiveModule {
}
