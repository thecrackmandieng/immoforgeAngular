import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TypesTarifTafType } from '../taf-type/types-tarif-taf-type';
@Component({
  selector: 'app-edit-types-tarif',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-types-tarif.component.html',
  styleUrls: ['./edit-types-tarif.component.css']
})
export class EditTypesTarifComponent implements OnInit, OnDestroy {
  reactiveForm_edit_types_tarif !: FormGroup;
  submitted: boolean = false
  loading_edit_types_tarif: boolean = false
  @Input()
  types_tarif_to_edit: TypesTarifTafType = new TypesTarifTafType();
  form_details: any = {}
  loading_get_details_edit_types_tarif_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditTypesTarifComponent");
      this.get_details_edit_types_tarif_form()
      this.update_form(this.types_tarif_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(types_tarif_to_edit:any) {
      this.reactiveForm_edit_types_tarif = this.formBuilder.group({
          code : [types_tarif_to_edit.code],
libelle : [types_tarif_to_edit.libelle]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_types_tarif .controls; }
  // validation du formulaire
  onSubmit_edit_types_tarif() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_types_tarif.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_types_tarif.invalid) {
          return;
      }
      var types_tarif = this.reactiveForm_edit_types_tarif.value
      this.edit_types_tarif({
      condition:{id_type_tarif:this.types_tarif_to_edit.id_type_tarif},
      data:types_tarif
      })
  }
  // vider le formulaire
  onReset_edit_types_tarif() {
      this.submitted = false;
      this.reactiveForm_edit_types_tarif.reset();
  }
  edit_types_tarif(types_tarif: any) {
      this.loading_edit_types_tarif = true;
      this.api.taf_post("types_tarif/edit", types_tarif, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table types_tarif. Réponse= ", reponse);
              //this.onReset_edit_types_tarif()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table types_tarif a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_types_tarif = false;
      }, (error: any) => {
          this.loading_edit_types_tarif = false;
      })
  }
  get_details_edit_types_tarif_form() {
      this.loading_get_details_edit_types_tarif_form = true;
      this.api.taf_post("types_tarif/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table types_tarif. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table types_tarif a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_types_tarif_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_types_tarif_form = false;
    })
  }
}