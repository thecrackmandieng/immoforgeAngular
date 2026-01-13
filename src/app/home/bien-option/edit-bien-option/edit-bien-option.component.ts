import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BienOptionTafType } from '../taf-type/bien-option-taf-type';
@Component({
  selector: 'app-edit-bien-option',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-bien-option.component.html',
  styleUrls: ['./edit-bien-option.component.css']
})
export class EditBienOptionComponent implements OnInit, OnDestroy {
  reactiveForm_edit_bien_option !: FormGroup;
  submitted: boolean = false
  loading_edit_bien_option: boolean = false
  @Input()
  bien_option_to_edit: BienOptionTafType = new BienOptionTafType();
  form_details: any = {}
  loading_get_details_edit_bien_option_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditBienOptionComponent");
      this.get_details_edit_bien_option_form()
      this.update_form(this.bien_option_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(bien_option_to_edit:any) {
      this.reactiveForm_edit_bien_option = this.formBuilder.group({
          bien_id : [bien_option_to_edit.bien_id],
option_id : [bien_option_to_edit.option_id]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_bien_option .controls; }
  // validation du formulaire
  onSubmit_edit_bien_option() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_bien_option.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_bien_option.invalid) {
          return;
      }
      var bien_option = this.reactiveForm_edit_bien_option.value
      this.edit_bien_option({
      condition:{id:this.bien_option_to_edit.id},
      data:bien_option
      })
  }
  // vider le formulaire
  onReset_edit_bien_option() {
      this.submitted = false;
      this.reactiveForm_edit_bien_option.reset();
  }
  edit_bien_option(bien_option: any) {
      this.loading_edit_bien_option = true;
      this.api.taf_post("bien_option/edit", bien_option, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table bien_option. Réponse= ", reponse);
              //this.onReset_edit_bien_option()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table bien_option a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_bien_option = false;
      }, (error: any) => {
          this.loading_edit_bien_option = false;
      })
  }
  get_details_edit_bien_option_form() {
      this.loading_get_details_edit_bien_option_form = true;
      this.api.taf_post("bien_option/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table bien_option. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table bien_option a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_bien_option_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_bien_option_form = false;
    })
  }
}