import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { InputImagesService } from '../../services/images/input-images.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private imageService: InputImagesService) {}
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);
  isLoading: boolean = false;
  messageError: string = '';
  messageSuccess: string = '';
  selectedImage: string | null = null;
  userId: string | null = null;
  tempImage: string | null = null;
  image!: string;

  registerForm: FormGroup = this._formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, { validators: this.confirmPassword });

  ngOnInit(): void {
    this.loadImage();
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.sendRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            // حفظ userId بعد التسجيل
            this.userId = res.userId;  // تأكد من أنك تحصل على userId من الاستجابة
            this.messageSuccess = res.message;
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          // عرض رسالة الخطأ
          this.messageError = error.error.message;
          this.isLoading = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.image = reader.result as string;
      if (this.userId) {
        this.imageService.setImage(this.userId, this.image);
      }
    };

    reader.readAsDataURL(file);
  }

  loadImage(): void {
    const image = this.imageService.getImage(this.userId);
    if (image) {
      const imgElement = document.getElementById('userImage') as HTMLImageElement;
      imgElement.src = image;
    }
  }
}