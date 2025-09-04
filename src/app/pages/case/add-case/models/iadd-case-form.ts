import { FormGroup } from "@angular/forms";
import { ICase } from "./icase";
import { IContract } from "./icontract";
import { IPOA } from "./ipoa";

export interface IAddCaseForm {
    mycase: ICase;
    contract: IContract;
    poa: IPOA;

}
