import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { BienTarifsTafType } from '../taf-type/bien-tarifs-taf-type';
@Component({
  selector: 'app-edit-bien-tarifs',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-bien-tarifs.component.html',
  styleUrls: ['./edit-bien-tarifs.component.css']
})
export class EditBienTarifsComponent implements OnInit, OnDestroy {
  reactiveForm_edit_bien_tarifs !: FormGroup;
  submitted: boolean = false
  loading_edit_bien_tarifs: boolean = false
  @Input()
  bien_tarifs_to_edit: BienTarifsTafType = new BienTarifsTafType();
  form_details: any = {}
  loading_get_details_edit_bien_tarifs_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditBienTarifsComponent");
      this.get_details_edit_bien_tarifs_form()
      this.update_form(this.bien_tarifs_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(bien_tarifs_to_edit:any) {
      this.reactiveForm_edit_bien_tarifs = this.formBuilder.group({
          bien_id : [bien_tarifs_to_edit.bien_id],
type_tarif_id : [bien_tarifs_to_edit.type_tarif_id],
montant : [bien_tarifs_to_edit.montant],
devise : [bien_tarifs_to_edit.devise],
date_debut : [bien_tarifs_to_edit.date_debut],
date_fin : [bien_tarifs_to_edit.date_fin],
actif : [bien_tarifs_to_edit.actif]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_bien_tarifs .controls; }
  // validation du formulaire
  onSubmit_edit_bien_tarifs() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_bien_tarifs.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_bien_tarifs.invalid) {
          return;
      }
      var bien_tarifs = this.reactiveForm_edit_bien_tarifs.value
      this.edit_bien_tarifs({
      condition:{id_tarif:this.bien_tarifs_to_edit.id_tarif},
      data:bien_tarifs
      })
  }
  // vider le formulaire
  onReset_edit_bien_tarifs() {
      this.submitted = false;
      this.reactiveForm_edit_bien_tarifs.reset();
  }
  edit_bien_tarifs(bien_tarifs: any) {
      this.loading_edit_bien_tarifs = true;
      this.api.taf_post("bien_tarifs/edit", bien_tarifs, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table bien_tarifs. Réponse= ", reponse);
              //this.onReset_edit_bien_tarifs()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table bien_tarifs a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_bien_tarifs = false;
      }, (error: any) => {
          this.loading_edit_bien_tarifs = false;
      })
  }
  get_details_edit_bien_tarifs_form() {
      this.loading_get_details_edit_bien_tarifs_form = true;
      this.api.taf_post("bien_tarifs/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table bien_tarifs. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table bien_tarifs a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_bien_tarifs_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_bien_tarifs_form = false;
    })
  }
}