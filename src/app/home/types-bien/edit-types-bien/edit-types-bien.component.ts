import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TypesBienTafType } from '../taf-type/types-bien-taf-type';
@Component({
  selector: 'app-edit-types-bien',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-types-bien.component.html',
  styleUrls: ['./edit-types-bien.component.css']
})
export class EditTypesBienComponent implements OnInit, OnDestroy {
  reactiveForm_edit_types_bien !: FormGroup;
  submitted: boolean = false
  loading_edit_types_bien: boolean = false
  @Input()
  types_bien_to_edit: TypesBienTafType = new TypesBienTafType();
  form_details: any = {}
  loading_get_details_edit_types_bien_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditTypesBienComponent");
      this.get_details_edit_types_bien_form()
      this.update_form(this.types_bien_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(types_bien_to_edit:any) {
      this.reactiveForm_edit_types_bien = this.formBuilder.group({
          code : [types_bien_to_edit.code],
libelle : [types_bien_to_edit.libelle]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_types_bien .controls; }
  // validation du formulaire
  onSubmit_edit_types_bien() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_types_bien.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_types_bien.invalid) {
          return;
      }
      var types_bien = this.reactiveForm_edit_types_bien.value
      this.edit_types_bien({
      condition:{id_type_bien:this.types_bien_to_edit.id_type_bien},
      data:types_bien
      })
  }
  // vider le formulaire
  onReset_edit_types_bien() {
      this.submitted = false;
      this.reactiveForm_edit_types_bien.reset();
  }
  edit_types_bien(types_bien: any) {
      this.loading_edit_types_bien = true;
      this.api.taf_post("types_bien/edit", types_bien, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table types_bien. Réponse= ", reponse);
              //this.onReset_edit_types_bien()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table types_bien a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_types_bien = false;
      }, (error: any) => {
          this.loading_edit_types_bien = false;
      })
  }
  get_details_edit_types_bien_form() {
      this.loading_get_details_edit_types_bien_form = true;
      this.api.taf_post("types_bien/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table types_bien. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table types_bien a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_types_bien_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_types_bien_form = false;
    })
  }
}