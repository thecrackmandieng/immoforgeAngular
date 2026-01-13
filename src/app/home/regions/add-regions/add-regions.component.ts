import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { RegionsTafType } from '../taf-type/regions-taf-type';
@Component({
  selector: 'app-add-regions',
  standalone: true, // Composant autonome
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule], // Dépendances importées
  templateUrl: './add-regions.component.html',
  styleUrls: ['./add-regions.component.css']
})
export class AddRegionsComponent implements OnInit, OnDestroy {
  reactiveForm_add_regions !: FormGroup;
  submitted:boolean=false
  loading_add_regions :boolean=false
  form_details: any = {}
  loading_get_details_add_regions_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
      console.groupCollapsed("AddRegionsComponent");
      this.get_details_add_regions_form()
      this.init_form()
  }
  ngOnDestroy(): void {
    console.groupEnd();
  }
  init_form() {
      this.reactiveForm_add_regions  = this.formBuilder.group({
          code: [""],
libelle: [""]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_regions .controls; }
  // validation du formulaire
  onSubmit_add_regions () {
      this.submitted = true;
      console.log(this.reactiveForm_add_regions .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_regions .invalid) {
          return;
      }
      var regions =this.reactiveForm_add_regions .value
      this.add_regions (regions )
  }
  // vider le formulaire
  onReset_add_regions () {
      this.submitted = false;
      this.reactiveForm_add_regions .reset();
  }
  add_regions(regions: any) {
      this.loading_add_regions = true;
      this.api.taf_post("regions/add", regions, (reponse: any) => {
      this.loading_add_regions = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table regions. Réponse= ", reponse);
          this.onReset_add_regions()
          this.api.Swal_success("Opération éffectuée avec succés")
          this.activeModal.close(reponse)
      } else {
          console.log("L'opération sur la table regions a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_regions = false;
    })
  }
  
  get_details_add_regions_form() {
      this.loading_get_details_add_regions_form = true;
      this.api.taf_post("regions/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table regions. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table regions a échoué. Réponse= ", reponse);
          this.api.Swal_error("L'opération a echoué")
        }
        this.loading_get_details_add_regions_form = false;
      }, (error: any) => {
      this.loading_get_details_add_regions_form = false;
    })
  }
}
