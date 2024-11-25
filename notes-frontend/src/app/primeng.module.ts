import { NgModule, Type } from "@angular/core";
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
const MODULES : Type<unknown>[] =[
    TableModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    CardModule

]

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class PrimeNGModule {}