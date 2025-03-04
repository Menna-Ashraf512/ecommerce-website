import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-profile',
  standalone: true, 
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router); // Router من Angular
  private readonly _formBuilder = inject(FormBuilder);

  isLoading: boolean = false;
  messageError: string = '';
  messageSuccess: string = '';
  userId: string | null = null;

  userData: FormGroup = this._formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  });

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.id;

      if (this.userId) {
        this.authService.getUser(this.userId).subscribe({
          next: (response) => {
            const user = response.data;
            this.userData.patchValue({
              name: user.name,
              email: user.email,
              phone: user.phone,
            });
            this.authService.userProfile.next(user);
            console.log('User Profile:', user);
          },
          error: (err) => {
            this.messageError = 'Failed to load user profile';
            console.error(err);
          },
        });
      }
    }
  }

  updateProfile(): void {
    if (this.userData.valid && this.userId) {
      this.isLoading = true;
      this.authService.updateUser(this.userData.value).subscribe({
        next: (res) => {
          console.log(res)
          this.isLoading = false; 
        },
        error: (err) => {
          this.messageError = err.error.message || 'Failed to update profile';
          this.isLoading = false;
        },
      });
    } else {
      this.userData.markAllAsTouched();
    }
  }
}