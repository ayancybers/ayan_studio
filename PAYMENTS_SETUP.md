# Payment gateway setup

## TuwaiqPay

Add these values to the deployment provider's server-side environment settings. Do not add merchant credentials to browser code or commit them to the project.

| Variable | Required | Purpose |
| --- | --- | --- |
| `TUWAIQPAY_USERNAME` | Yes | Merchant login name or mobile number |
| `TUWAIQPAY_PASSWORD` | Yes | Merchant API password |
| `TUWAIQPAY_USER_NAME_TYPE` | No | `MOBILE` or `EMAIL`; inferred from the username if omitted |
| `TUWAIQPAY_API_BASE_URL` | No | Defaults to production. For the test account use `https://onboarding-uat.tuwaiqpay.com.sa` |
| `TUWAIQPAY_SUPPORTED_METHODS` | No | Comma-separated provider codes; defaults to `VISA,MASTER,MADA,AMEX,STC_PAY,APPLE_PAY` |
| `TUWAIQPAY_WEBHOOK_HEADER_KEY` | Yes | Custom webhook header name agreed with TuwaiqPay |
| `TUWAIQPAY_WEBHOOK_HEADER_VALUE` | Yes | Strong secret value TuwaiqPay must send in that header (at least 24 characters) |
| `TUWAIQPAY_RECEIPT_SECRET` | Yes | Random secret with at least 32 characters, used to protect paid invoice links |
| `APP_BASE_URL` | Recommended | Public site URL, for example `https://example.com` |
| `RESEND_API_KEY` | Yes | Sends the confirmed invoice to the customer's email |
| `EMAIL_FROM` | Yes | Sender address on a domain verified with Resend, for example `Ayan Photography <billing@example.com>` |
| `EMAIL_BCC` | No | Optional copy of customer invoices to a business mailbox |
| `webhookbooking` or `DISCORD_WEBHOOK_Booking` | No | Optional paid-booking notification with an invoice link |

Set the TuwaiqPay webhook URL to `https://YOUR_DOMAIN/api/tuwaiqpay-webhook`, and configure the same custom header name and value on the provider side. The checkout keeps TuwaiqPay unavailable until its merchant credentials, webhook authentication, invoice receipt secret, and verified invoice email sender are configured. The invoice is made available only after an authenticated webhook confirms that the bill is paid. A browser return from the provider alone is not treated as proof of payment.

The API guide lists `VISA`, `MASTER`, `MADA`, and `AMEX`; the supplied WooCommerce plugin also contains `STC_PAY` and `APPLE_PAY` codes. Enable each method only if it is enabled for this merchant account. If TuwaiqPay declines a code, remove it from `TUWAIQPAY_SUPPORTED_METHODS` until the provider confirms support.

## Fees shown to customers

The checkout adds the selected payment fee to the package amount:

| Method | Fee |
| --- | ---: |
| mada | 1.2% + 1 SAR |
| Visa/Mastercard issued in Saudi Arabia | 2.5% + 1 SAR |
| Gulf/international Visa or Mastercard | 3.0% + 1 SAR |
| American Express | 2.9% + 1 SAR |
| STC Pay | 1.8% + 1 SAR |
| Apple Pay | 1.2% + 1 SAR |

The buyer selects the local or Gulf/international card tier in checkout. The API documentation does not describe a server-side card-country lookup, so the fee tier follows the buyer's selection. Refund, bank-transfer, and monthly-plan charges from the contract are not customer checkout methods and are not included in the checkout selector.

Tabby and Tamara remain independent payment choices and use their existing server credentials. `TAP_SECRET_KEY` can remain configured temporarily if older Tap invoice links still need verification; new Tap checkout requests are disabled.
