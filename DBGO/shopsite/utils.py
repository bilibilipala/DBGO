import random
import string
import uuid

from PIL import Image, ImageDraw, ImageFont
from dysms_python import demo_sms_send



# 生成随机4位字符串



def get_random_char(count=4):
    # 生成随机字符串
    # string模块包含各种字符串
    # 以下为大小写字符加上数字
    ran_str = string.ascii_letters + string.digits
    char = ''
    for i in range(count):
        char += random.choice(ran_str)
    return char


# 返回一个随机的RGB颜色
def get_random_color():
    return random.randint(50, 150), random.randint(50, 150), random.randint(50, 150)


# 创建验证码
def create_code():
    # 创建图片，模式，大小，背景色
    img = Image.new(mode='RGB', size=(120, 30), color=(255, 255, 255))
    # 创建画布
    draw = ImageDraw.Draw(img)
    # 设置字体
    font = ImageFont.truetype('../static/fonts/arial.ttf', 25)
    code = get_random_char(4)
    # 将生成的字符写在画布上
    for i in range(4):
        draw.text((30 * i + 5, 0), code[i], get_random_color(), font)
    # 生成干扰点
    for _ in range(random.randint(0, 300)):
        draw.point((random.randint(0, 120), random.randint(0, 30)), fill=get_random_color())
    # 使用模糊滤镜
    # img = img.filter(ImageFilter.BLUR)
    return img, code


# 创建验证码
def create_phonecode():
    chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    x = random.choice(chars), random.choice(chars), random.choice(chars), random.choice(chars), random.choice(chars), random.choice(chars)
    code = "".join(x)
    return code
# 事务处理


# 手机验证码
def phone_code(phone):
    create_code = create_phonecode()
    __business_id = uuid.uuid1()
    params = {'code': create_code}
    demo_sms_send.send_sms(__business_id, phone, "gqw", "SMS_148613819", params)
    return create_code


