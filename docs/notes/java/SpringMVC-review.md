# SpringMVC笔记

## Overview-工作流程

工作流程

![img](https://cdn.nlark.com/yuque/0/2024/png/35887716/1707875719968-8e481b97-a408-4cc5-832d-cff16b68b333.png)**SpringMVC涉及组件理解：**

1. DispatcherServlet :  SpringMVC提供，我们需要使用web.xml配置使其生效，它是整个流程处理的核心，所有请求都经过它的处理和分发！[ CEO ]
2. HandlerMapping :  SpringMVC提供，我们需要进行IoC配置使其加入IoC容器方可生效，它内部缓存handler(controller方法)和handler访问路径数据，被DispatcherServlet调用，用于查找路径对应的handler！[秘书]
3. HandlerAdapter : SpringMVC提供，我们需要进行IoC配置使其加入IoC容器方可生效，它可以处理请求参数和处理响应数据数据，每次DispatcherServlet都是通过handlerAdapter间接调用handler，他是handler和DispatcherServlet之间的适配器！[经理]
4. Handler : handler又称处理器，他是Controller类内部的方法简称，是由我们自己定义，用来接收参数，向后调用业务，最终返回响应结果！[打工人]
5. ViewResovler : SpringMVC提供，我们需要进行IoC配置使其加入IoC容器方可生效！视图解析器主要作用简化模版视图页面查找的，但是需要注意，前后端分离项目，后端只返回JSON数据，不返回页面，那就不需要视图解析器！所以，视图解析器，相对其他的组件不是必须的！[财务]



## SpringMVC接收数据

### 访问路径设置

1. 模糊匹配

   > 在@RequestMapping注解指定 URL 地址时，通过使用通配符，匹配多个类似的地址。

```java
@Controller
public class ProductController {
    /**
     *  路径设置为 /product/*  
     *    /* 为单层任意字符串  /product/a  /product/aaa 可以访问此handler  
     *    /product/a/a 不可以
     *  路径设置为 /product/** 
     *   /** 为任意层任意字符串  /product/a  /product/aaa 可以访问此handler  
     *   /product/a/a 也可以访问
     */
    @RequestMapping("/product/*")
    @ResponseBody
    public String show(){
        System.out.println("ProductController.show");
        return "product show!";
    }
}
```

>   /*：只能匹配URL地址中的一层，如果想准确匹配两层，那么就写`/*/*`以此类推。 
>
>  /**：可以匹配URL地址中的多层。





## 拦截器配置

拦截器 Springmvc VS 过滤器 javaWeb：

- 相似点
    - 拦截：必须先把请求拦住，才能执行后续操作
    - 过滤：拦截器或过滤器存在的意义就是对请求进行统一处理
    - 放行：对请求执行了必要操作后，放请求过去，让它访问原本想要访问的资源
- 不同点
    - 工作平台不同
        - 过滤器工作在 Servlet 容器中
        - 拦截器工作在 SpringMVC 的基础上
    - 拦截的范围
        - 过滤器：能够拦截到的最大范围是整个 Web 应用
        - 拦截器：能够拦截到的最大范围是整个 SpringMVC 负责的请求
    - IOC 容器支持
        - 过滤器：想得到 IOC 容器需要调用专门的工具方法，是间接的
        - 拦截器：它自己就在 IOC 容器中，所以可以直接从 IOC 容器中装配组件，也就是可以直接得到 IOC 容器的支持

拦截器方法拦截位置：

![img](https://cdn.nlark.com/yuque/0/2024/png/35887716/1716103206829-24442f52-8250-4798-80f5-4462af807b59.png)

### 拦截器的使用

> 需求：创建一个登录拦截器，需求是拦截所有以/headline/开始的请求，验证登录信息token

1. 创建拦截器,根据需要实现preHandle,postHandle，affterCompletion方法

   ```java
   @Component
   public class LoginProtectInterceptor implements HandlerInterceptor {
   
       @Autowired
       JwtHelper jwtHelper;
   
       /**
        * 登录验证，需要有token且没有过期才放行
        *    拦截条件
        *    1.没有token
        *    2，token过期
        */
       @Override
       public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
   //        if (!(request instanceof ContentCachingRequestWrapper)) {
   //            request = new ContentCachingRequestWrapper(request);
   //        }
   
           String token = request.getHeader("token");
           if (StringUtils.isEmpty(token) || jwtHelper.isExpiration(token)){
               Result<Object> result = Result.build(null, ResultCodeEnum.NOTLOGIN);
               // java 对象转成字符串
               ObjectMapper objectMapper = new ObjectMapper();
               String json = objectMapper.writeValueAsString(result);
               response.getWriter().print(json);
               return false ; // 拦截
           }
           return true; // 放行
       }
       
        // 在目标 handler 方法之后，handler报错不执行!
       @Override
       public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
           System.out.println("request = " + request + ", response = " + response + ", handler = " + handler + ", modelAndView = " + modelAndView);
           System.out.println("Process01Interceptor.postHandle");
       }
    
       // 渲染视图之后执行(最后),一定执行!
       @Override
       public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
           System.out.println("request = " + request + ", response = " + response + ", handler = " + handler + ", ex = " + ex);
           System.out.println("Process01Interceptor.afterCompletion");
       }
   
   }修改配置类添加拦截器
   ```

2. 修改配置类添加拦截器

   在springboot中使用:

   - 首先创建配置类：`config/WebMvcConfig.java`

   ```java
   @Configuration
   public class WebMvcConfig implements WebMvcConfigurer {
       @Autowired
       private LoginProtectInterceptor loginProtectInterceptor;
   
       @Autowired
       private HeadLineInterceptor headLineInterceptor;
       
       //添加拦截器
       @Override
       public void addInterceptors(InterceptorRegistry registry) {
           registry.addInterceptor(loginProtectInterceptor).addPathPatterns("/headline/**");
   //        registry.addInterceptor(headLineInterceptor)
   //                .addPathPatterns("/headline/update", "/headline/removeByHid");
       }
   }
   ```

   

3. 配置详解

   ```java
   // 1.默认拦截全部
   registry.addInterceptor(new LoginProtectInterceptor());
   
   // 2.精准匹配
   //设置拦截器处理指定请求 路径可以设置一个或者多个,为项目下路径即可 
   //也支持 /* 和 /** 模糊路径。 * 任意一层字符串 ** 任意层 任意字符串
       registry.addInterceptor(new Process01Interceptor()).addPathPatterns("/common/request/one","/common/request/tow");
   
   // 3.排除匹配
   // 排除应该在匹配的范围内排除
   //addPathPatterns("/common/request/one") 添加拦截路径
   //excludePathPatterns("/common/request/tow"); 排除路径,排除应该在拦截的范围内
   registry.addInterceptor(new Process01Interceptor())
           .addPathPatterns("/common/request/one","/common/request/tow")
           .excludePathPatterns("/common/request/tow");
   ```

   

4. 多个拦截器执行顺序

   1. preHandle() 方法：SpringMVC 会把所有拦截器收集到一起，然后按照配置顺序调用各个 preHandle() 方法。
   2. postHandle() 方法：SpringMVC 会把所有拦截器收集到一起，然后按照配置相反的顺序调用各个 postHandle() 方法。
   3. afterCompletion() 方法：SpringMVC 会把所有拦截器收集到一起，然后按照配置相反的顺序调用各个 afterCompletion() 方法。



## SpringMVC小知识点

### Json 字符串和 Java 对象的相互转换

> 使用Jackson 下面的`ObjectMapper`,Spring中可以使用**注入**

```java
// java对象转json
ObjectMapper objectMapper = new ObjectMapper();
String json = objectMapper.writeValueAsString(result);
// jackson 字符串转java对象
String jsonString = "{\"name\":\"John\", \"age\":30}";
ObjectMapper objectMapper = new ObjectMapper();
User user = objectMapper.readValue(jsonString, User.class);

```

### 使用 `HttpServletResponse` 输出流返回 JSON 字符串

首先，确保你的控制器类注入了 `HttpServletResponse` 对象，并设置正确的内容类型和字符编码。然后，你可以使用 `response.getWriter().print(jsonString)` 或者`response.getWriter().write(jsonString)`将 JSON 字符串写入响应。

```java
response.getWriter().write(jsonString);
response.getWriter().print(jsonString);
// print 底层是调用了write： 
//public void print(String s) {
//      write(String.valueOf(s));
//  }
```

