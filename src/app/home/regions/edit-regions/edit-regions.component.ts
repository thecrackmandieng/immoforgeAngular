import { Component, EventEmitter, Input, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { RegionsTafType } from '../taf-type/regions-taf-type';
@Component({
  selector: 'app-edit-regions',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './edit-regions.component.html',
  styleUrls: ['./edit-regions.component.css']
})
export class EditRegionsComponent implements OnInit, OnDestroy {
  reactiveForm_edit_regions !: FormGroup;
  submitted: boolean = false
  loading_edit_regions: boolean = false
  @Input()
  regions_to_edit: RegionsTafType = new RegionsTafType();
  form_details: any = {}
  loading_get_details_edit_regions_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService, public activeModal: NgbActiveModal) { 
      
  }
  ngOnInit(): void {
      console.groupCollapsed("EditRegionsComponent");
      this.get_details_edit_regions_form()
      this.update_form(this.regions_to_edit)
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  // mise à jour du formulaire
  update_form(regions_to_edit:any) {
      this.reactiveForm_edit_regions = this.formBuilder.group({
          code : [regions_to_edit.code],
libelle : [regions_to_edit.libelle]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_regions .controls; }
  // validation du formulaire
  onSubmit_edit_regions() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_regions.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_regions.invalid) {
          return;
      }
      var regions = this.reactiveForm_edit_regions.value
      this.edit_regions({
      condition:{id_region:this.regions_to_edit.id_region},
      data:regions
      })
  }
  // vider le formulaire
  onReset_edit_regions() {
      this.submitted = false;
      this.reactiveForm_edit_regions.reset();
  }
  edit_regions(regions: any) {
      this.loading_edit_regions = true;
      this.api.taf_post("regions/edit", regions, (reponse: any) => {
          if (reponse.status) {
              this.activeModal.close(reponse)
              console.log("Opération effectuée avec succés sur la table regions. Réponse= ", reponse);
              //this.onReset_edit_regions()
              this.api.Swal_success("Opération éffectuée avec succés")
          } else {
              console.log("L'opération sur la table regions a échoué. Réponse= ", reponse);
              this.api.Swal_error("L'opération a echoué")
          }
          this.loading_edit_regions = false;
      }, (error: any) => {
          this.loading_edit_regions = false;
      })
  }
  get_details_edit_regions_form() {
      this.loading_get_details_edit_regions_form = true;
      this.api.taf_post("regions/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table regions. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table regions a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_edit_regions_form = false;
      }, (error: any) => {
      this.loading_get_details_edit_regions_form = false;
    })
  }
}