import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CcRecipesService } from '../core/services/cc-recipes.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent {
  private ccRecipesService = inject(CcRecipesService);
  private formBuilder = inject(FormBuilder);
  protected valid = true;
  protected scheduleForm = this.formBuilder.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
  })
}
