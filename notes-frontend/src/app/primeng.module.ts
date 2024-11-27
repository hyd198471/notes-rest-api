import { NgModule, Type } from "@angular/core";
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from "primeng/dropdown";
import { FloatLabelModule } from "primeng/floatlabel";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
const MODULES: Type<unknown>[] = [
    TableModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule

]

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class PrimeNGModule { }