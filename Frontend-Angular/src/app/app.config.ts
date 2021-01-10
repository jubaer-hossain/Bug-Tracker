import { environment } from 'src/environments/environment';

export class AppConfig {
    public static GetAllUser = environment.url.concat('admin/users');
    public static GetUserById = environment.url.concat('profile/');
    public static EditUser = environment.url.concat('user/update/');
    public static GetAllProjects = environment.url.concat('admin/projects');
    public static AddProject = environment.url.concat('projects/5ff8372e6f75cb315cdb9026');
    public static GetSingalProject = environment.url.concat('projects/details');
    public static EditProject = environment.url.concat('projects/update/');
    public static ChangePasssword = environment.url.concat('profile/forgot/changepassword');
}
