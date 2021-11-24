<?php

/**
 * @var core\entities\Part\Part $good
 * @var bool $isGuest
 * @var bool $quantityRestrictions
 * @var bool $availRestrictions
 * @var string $rowClass
 * @var int $blockId
 * @var string $name
 * @var core\providers\MapDataProvider $goods
 * @var bool $checkZero
 * @var core\services\catalog\UserAccessCheckerServiceInterface $userAccessCheckerService
 */

use app\components\widgets\Catalog\StockPopoverWidget;
use yii\helpers\Html;
use yii\helpers\Json;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;

$goods = $goods->getModels();
?>
<?php if (count($goods) > 0): ?>
    <div class="row <?php echo $rowClass ?>" id="<?= $blockId ?>">
        <div class="col">
            <div class="d-flex flex-column flex-md-row justify-content-start mt-2 mb- align-items-md-end">
                <h2 class="mt-0 mb-3 mb-sm-0"><?php echo $name ?></h2>
            </div>
            <div class="row mt-3 mb-4">
                <div class="col">
                    <div class="js-items-slider news-slider visible-fav">
                        <?php foreach ($goods as $good): ?>
                            <?php
                            $priceId = array_search(true, ArrayHelper::getColumn($good->prices, 'isBase'));

                            $defaultQuantity = $good->warehouse_quantity;
                            $quantity = $good->quantity;

                            if ($quantity > $defaultQuantity) {
                                $otherQuantity = $quantity - $defaultQuantity;
                            } else {
                                $otherQuantity = $defaultQuantity;
                            }

                            if ($checkZero === true && ($defaultQuantity == 0 && $otherQuantity == 0)) {
                                continue;
                            }
                            ?>

                            <div class="action-slider__item">
                                <div class="box-shadowed h-100 p-2 d-flex flex-column f-1 h-auto">
                                    <div class="d-flex">
                                        <a class="img-box"
                                           href="/catalog/<?php echo $good->url ?>">

                                            <?php if ($good->preview_image !== null): ?>
                                                <img
                                                        src="<?php echo $good->preview_image ?>"
                                                        srcset="<?php echo $good->preview_image ?>"
                                                        alt="">
                                            <?php else: ?>
                                                <div class="analog-morepicture-gallery__stub" style=""></div>
                                            <?php endif; ?>
                                        </a>
                                        <div class="text-left">
                                            <span>Код:&nbsp;</span>
                                            <span class="nowrap bold"><?php echo $good->code ?></span>
                                            <div class="mt-2 nowrap">
                                                <a class="actions icon-eye fs-15"
                                                   href="#modal-quick-view"
                                                   data-toggle="modal"
                                                   data-product-code="<?= Html::encode(Json::encode($good->code)) ?>"
                                                >
                                                </a>
                                                <a class="actions icon-schsm fs-15"
                                                   href="#modal-product-applicabilities"
                                                   data-toggle="modal"
                                                   data-product-id="<?= Html::encode(Json::encode($good->id)) ?>"
                                                >
                                                </a>
                                                <add-to-favorite-form :product-id="<?= $good->id ?>"
                                                                      :favorite-product="<?= Html::encode(Json::encode($good->favorite)) ?>"
                                                                      :is-guest="<?= Html::encode(Json::encode($isGuest)) ?>"
                                                ></add-to-favorite-form>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="m-0">
                                        <a
                                                href="/catalog/<?php echo $good->url ?>"><?php echo $good->title ?></a>
                                    </p>
                                    <p class="m-0">Артикул: <?php echo $good->article ?></p>
                                    <div class="mt-2 nowrap mb-2">
                                        <product-list-prices
                                                :prices="<?= Html::encode(Json::encode($good->prices)) ?>"
                                                :special-price-type-id="<?= Html::encode(Json::encode(Yii::$app->params['specialPriceDescriptionId'])) ?>"
                                        >
                                            <?php foreach ($good->prices as $price): ?>
                                                <p class="mb-1 nowrap card-product-sub-price">
                                                    <span class="fake mr-2 link-color price">
                                                        <?= $price->typeName ?>
                                                    </span>
                                                    <span class="text-nowrap"><?= $price->amount ?> ₽</span>
                                                </p>
                                            <?php endforeach; ?>
                                        </product-list-prices>
                                    </div>

                                    <div class="d-flex w-100 justify-content-between mt-auto">
                                        <p class="mr-2 mt-1 mb-0">
                                            <?= StockPopoverWidget::widget(['good' => $good]) ?>
                                        </p>
                                        <basket-component
                                                good-id="<?= $good->id ?>"
                                                url="<?= Url::current() ?>"
                                                title="<?= Html::encode($this->title) ?>"
                                                :total-quantity="<?= (int)($good->totalQuantity) ?>"
                                                :quantity-restrictions="<?= Json::encode($quantityRestrictions) ?>"
                                                :avail-restrictions="<?= Json::encode($availRestrictions) ?>"
                                                :order-allowed="<?= Json::encode($userAccessCheckerService->isPartAllowed($good->id)) ?>"
                                        ></basket-component>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endif; ?>