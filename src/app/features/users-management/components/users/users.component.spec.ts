
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import * as mockedAdminProducts from 'src/app/core/mocks/mocked-users.json';
import { UsersComponent } from './users.component';
import { UsersService } from '../../services/users.service';
import { UserModel } from './../../models/user.model';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

  describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let userProductsServiceSpy: any;

    beforeEach(async () => {
      userProductsServiceSpy = jasmine.createSpyObj(['getUsersData']);
      await TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          TranslateModule.forRoot(),
          MatSnackBarModule,
        ],
        declarations: [UsersComponent],
        providers: [
          { providers: UsersService, useValue: userProductsServiceSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(UsersComponent);
      component = fixture.componentInstance;
      userProductsServiceSpy = TestBed.inject(UsersService);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Test getUsersData()', () => {
      const serviceSpy = spyOn(userProductsServiceSpy, 'getUsersData');
      serviceSpy.and.returnValue(of(mockedAdminProducts));
      component.getUsersData();
      expect(component.length).toEqual(3);
    });
  });
