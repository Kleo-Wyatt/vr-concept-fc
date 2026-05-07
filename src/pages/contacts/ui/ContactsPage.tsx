import { Card } from '@shared/ui';

import { ContactForm } from './ContactForm/ContactForm';
import { YandexMap } from './YandexMap/YandexMap';
import {
  RutubeIcon,
  TelegramIcon,
  VkIcon,
  YouTubeIcon,
} from './SocialIcons/SocialIcons';
import { LocationIcon, MailIcon, PhoneIcon } from './ContactIcons/ContactIcons';

import styles from './ContactsPage.module.css';

const contactCards = [
  {
    Icon: LocationIcon,
    title: 'Адрес',
    content: (
      <>
        Москва, ул. Маши Порываевой, д. 34
        <br />
        Офис компании VR Concept
        <br />
        Метро: Комсомольская
      </>
    ),
  },
  {
    Icon: PhoneIcon,
    title: 'Телефон',
    content: (
      <>
        <a href="tel:+74951234567">+7 (495) 123-45-67</a>
        <br />
        <a href="tel:+74959876543">+7 (495) 987-65-43</a>
        <br />
        Режим работы: Пн-Пт 09:00-18:00
      </>
    ),
  },
  {
    Icon: MailIcon,
    title: 'Email',
    content: (
      <>
        <a href="mailto:info@vrconceptfc.ru">info@vrconceptfc.ru</a>
        <br />
        <a href="mailto:coach@vrconceptfc.ru">coach@vrconceptfc.ru</a>
        <br />
        Ответ в течение 24 часов
      </>
    ),
  },
];

const benefits = [
  'Быстрый ответ',
  'Профессиональный подход',
  'Конфиденциальность',
];

const socialLinks = [
  {
    Icon: VkIcon,
    title: 'VKontakte',
    href: 'https://vk.com/vr_concept',
  },
  {
    Icon: TelegramIcon,
    title: 'Telegram',
    href: 'https://t.me/vrconcept',
  },
  {
    Icon: RutubeIcon,
    title: 'RuTube',
    href: 'https://rutube.ru/channel/25986992/',
  },
  {
    Icon: YouTubeIcon,
    title: 'YouTube',
    href: 'https://www.youtube.com/channel/UCFEZgpwc2eKm_BzOfsB-k2g',
  },
];

const faqItems = [
  {
    question: 'Как присоединиться к команде?',
    answer:
      'Заполните форму контактов или напишите на почту coach@vrconceptfc.ru. Мы проведем собеседование и тренировку.',
  },
  {
    question: 'Когда проходят тренировки?',
    answer:
      'Тренировки проводятся 2 раза в неделю: в Пн и Пт с 19:00 до 21:00 на стадионе «Луч».',
  },
  {
    question: 'Нужен ли опыт в футболе?',
    answer:
      'Желателен опыт игры в футбол, но не обязателен. Главное — энтузиазм и желание развиваться.',
  },
  {
    question: 'Какая экипировка нужна?',
    answer:
      'Спортивная форма, бутсы, гетры, щитки. Часть экипировки предоставляет команда.',
  },
  {
    question: 'Сколько стоит участие?',
    answer:
      'Участие в команде бесплатно. Часть расходов покрывает спонсорская поддержка.',
  },
  {
    question: 'Как купить билет на матч?',
    answer:
      'Билеты можно приобрести через форму заявки на странице расписания или уточнить информацию у администрации клуба.',
  },
];

export function ContactsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Контакты</h1>
          <p className={styles.pageDescription}>
            Свяжитесь с нами для получения информации
          </p>
        </div>
      </section>

      <section className={styles.contactsSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {contactCards.map(({ Icon, ...card }) => (
              <Card className={styles.contactCard} key={card.title}>
                <Icon className={styles.contactIcon} />
                <h2>{card.title}</h2>
                <p>{card.content}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            <div className={styles.formIntro}>
              <h2>Напишите нам</h2>
              <p>
                Есть вопросы о команде, чемпионате или хотите присоединиться?
                Заполните форму, и мы свяжемся с вами как можно скорее.
              </p>

              <div className={styles.benefits}>
                {benefits.map((benefit) => (
                  <div className={styles.benefit} key={benefit}>
                    <span className={styles.benefitIcon}>✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            Следите за нами в социальных сетях
          </h2>

          <p className={styles.sectionSubtitle}>
            Подпишитесь на наши социальные сети, чтобы быть в курсе последних
            новостей и событий команды
          </p>

          <div className={styles.socialGrid}>
            {socialLinks.map(({ Icon, ...social }) => (
              <a
                className={styles.socialCard}
                href={social.href}
                key={social.title}
                target="_blank"
                rel="noreferrer"
                aria-label={`${social.title}`}
              >
                <Card className={styles.socialCardInner}>
                  <Icon className={styles.socialIcon} />
                  <h3>{social.title}</h3>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Часто задаваемые вопросы</h2>

          <div className={styles.faqGrid}>
            {faqItems.map((item) => (
              <Card className={styles.faqItem} key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Как нас найти</h2>

          <Card className={styles.mapCard}>
            <YandexMap />
          </Card>
        </div>
      </section>
    </main>
  );
}
