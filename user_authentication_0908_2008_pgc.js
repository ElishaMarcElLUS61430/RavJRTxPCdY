// 代码生成时间: 2025-09-08 20:08:58
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

// 用户身份验证控制器
export default class UserAuthenticationController extends Controller {
  // 注入会话服务
  @service session;
  
  // 跟踪表单输入的状态
  @tracked username = '';
  @tracked password = '';  
  @tracked errorMessage = '';
  
  // 登录表单提交事件处理函数
  @action
  async login() {
    try {
      // 清除之前的错误消息
      this.errorMessage = '';
      
      // 调用会话服务的认证方法
      await this.session.authenticate('authenticator:application', this.username, this.password);
      
      // 登录成功，重定向到主页
      this.transitionToRoute('index');
    } catch (error) {
      // 错误处理
      this.errorMessage = 'Authentication failed: ' + error.message;
    }
  }
  
  // 注销函数
  @action
  logout() {
    this.session.invalidate();
  }
}
