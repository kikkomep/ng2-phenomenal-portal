import { Component, OnInit } from '@angular/core';
import {ApplicationService, CredentialService, ErrorService, TokenService} from 'ng2-cloud-portal-service-lib';
import {CloudProvider} from './cloud-provider';

@Component({
  selector: 'ph-setup-cloud-environment',
  templateUrl: './setup-cloud-environment.component.html',
  styleUrls: ['./setup-cloud-environment.component.css']
})
export class SetupCloudEnvironmentComponent implements OnInit {
  get cloudProviderCollection(): CloudProvider[] {
    return this._cloudProviderCollection;
  }

  private _phenomenal_logo = 'assets/img/logo/default_app.png';
  private _openstack_logo = 'assets/img/logo/openstack_logo.png';
  private _aws_logo = 'assets/img/logo/aws_logo.png';

  private _cloudProviderCollection: CloudProvider[];

  constructor(
    private _applicationService: ApplicationService,
    public credentialService: CredentialService,
    public tokenService: TokenService,
    public errorService: ErrorService
  ) {

    this._cloudProviderCollection = [
      {
        title: 'PhenoMenal Cloud',
        description: 'Your data will be stored on the PhenoMeNal Cloud with computing power by PhenoMeNal partners',
        paymentDescription: 'Free',
        providerDescription: 'EMBL-EBI, Uppsala Uni',
        locationDescription: 'Europe',
        logo: this._phenomenal_logo,
        isSelected: false,
        credential: {
          username: '',
          password: '',
          tenant_name: 'PhenoMeNal',
          url: 'https://extcloud03-keystone.ebi.ac.uk:5000/v2.0',
          provider: 'OSTACK'
        }
      },
      {
        title: 'OpenStack',
        description: 'Your Cloud Research Environment can be deployed at any OpenStack cloud you have an account for.',
        paymentDescription: 'Commercial or Free',
        providerDescription: 'N/a',
        locationDescription: 'N/a',
        logo: this._openstack_logo,
        isSelected: false,
        credential: {
          username: '',
          password: '',
          tenant_name: '',
          url: '',
          provider: 'OSTACK'
        }
      },
      {
        title: 'Amazon AWS',
        description: 'Amazon AWS is a commercial cloud provider. Use this if you already have an Amazon AWS account.',
        paymentDescription: 'Commercial',
        providerDescription: 'Amazon AWS',
        locationDescription: 'Worldwide',
        logo: this._aws_logo,
        isSelected: false,
        credential: {
          username: '',
          password: '',
          tenant_name: '',
          url: '',
          provider: 'AWS'
        }
      }
    ];

    if (tokenService.getToken()) {
      this.getAllApplication();
    }
  }

  ngOnInit() {
  }

  getAllApplication() {
    this._applicationService.getAll(
      this.credentialService.getUsername(),
      this.tokenService.getToken()
    ).subscribe(
      deployment  => {
        console.log('[RepositoryComponent] getAll %O', deployment);
      },
      error => {
        console.log('[RepositoryComponent] getAll error %O', error);
        this.errorService.setCurrentError(error);
        this.tokenService.clearToken();
        this.credentialService.clearCredentials();
      }
    );
  }

}
