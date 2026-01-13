import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { OptionsCatalogueTafType } from '../taf-type/options-catalogue-taf-type';
@Component({
  selector: 'app-edit-options-catalogue',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-options-catalogue.component.html',
  styleUrls: ['./edit-options-catalogue.component.css']
})
export class EditOptionsCatalogueComponent implements OnInit, OnDestroy {
  reactiveForm_edit_options_catalogue !: FormGroup;
  submitted: boolean = false
  loading_edit_options_catalogue: boolean = false
  @Input()
  options_catalogue_to_edit: OptionsCatalogueTafType = new OptionsCatalogueTafType();
  form_details: any = {}
  loading_get_details_edit_options_catalogue_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditOptionsCatalogueComponent");
      this.get_details_edit_options_catalogue_form()
      this.update_form(this.options_catalogue_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(options_catalogue_to_edit:any) {
      this.reactiveForm_edit_options_catalogue = this.formBuilder.group({
          code : [options_catalogue_to_edit.code],
libelle : [options_catalogue_to_edit.libelle]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_options_catalogue .controls; }
  // validation du formulaire
  onSubmit_edit_options_catalogue() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_options_catalogue.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_options_catalogue.invalid) {
          return;
      }
      var options_catalogue = this.reactiveForm_edit_options_catalogue.value
      this.edit_options_catalogue({
      condition:{id_option:this.options_catalogue_to_edit.id_option},
      data:options_catalogue
      })
  }
  // vider le formulaire
  onReset_edit_options_catalogue() {
      this.submitted = false;
      this.reactiveForm_edit_options_catalogue.reset();
  }
  edit_options_catalogue(options_catalogue: any) {
      this.loading_edit_options_catalogue = true;
      this.api.taf_post("options_catalogue/edit", options_catalogue, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table options_catalogue. Réponse= ", reponse);
              //this.onReset_edit_options_catalogue()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table options_catalogue a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_options_catalogue = false;
      }, (error: any) => {
          this.loading_edit_options_catalogue = false;
      })
  }
  get_details_edit_options_catalogue_form() {
      this.loading_get_details_edit_options_catalogue_form = true;
      this.api.taf_post("options_catalogue/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table options_catalogue. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table options_catalogue a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_options_catalogue_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_options_catalogue_form = false;
    })
  }
}