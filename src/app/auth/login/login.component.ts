import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {UsersService} from '../../shared/service/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/service/auth.service';

@Component({
    selector: 'rdk-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    message: Message;

    constructor(private userService: UsersService,
                private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
        this.route.queryParams
            .subscribe((params: Params) => {
                if (params['nowCanLogin']) {
                    this.showMessage({
                        text: 'Теперь вы можете зайти в систему',
                        type: 'success'
                    });
                }
            });
        this.form = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    onSubmit() {
        const formData = this.form.value;

        this.userService.getUserByEmail(formData.email).subscribe((user: User) => {
            if (user) {
                if (user.password === formData.password) {
                    this.message.text = '';
                    window.localStorage.setItem('user', JSON.stringify(user));
                    this.authService.login();
                } else {
                    this.showMessage({
                        text: 'Пароль не верный',
                        type: 'danger'
                    });
                }
            } else {
                this.showMessage({
                    text: 'Такого пользователя не сущесвует',
                    type: 'danger'
                });
            }
        });
    }

    private showMessage(message: Message) {
        this.message = message;
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }

}
