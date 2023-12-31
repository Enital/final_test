import React, { useState } from 'react';
import s from './Table.module.css';
import Icons from '../../images/icons/symbol-defs.svg';
import { useMediaQuery } from 'react-responsive';
import * as mob from '../../images/illustration';
import { nanoid } from 'nanoid';
import MealModal from '../DiaryOnMain/MealModal';
// import { useSelector } from 'react-redux';
// import { selectGoals } from 'redux/usersGoal/selectors';
const DiaryTable = ({
  mealType,
  mealData,
  onUpdateMealButtonClick,
  setFoodName,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 833 });

  function calculateSum(meal) {
    return meal.reduce(
      (acc, mealItem) => {
        acc.carbonohidratesSum += Number(mealItem.carbonohidrates);
        acc.proteinSum += Number(mealItem.protein);
        acc.fatSum += Number(mealItem.fat);
        return acc;
      },
      { carbonohidratesSum: 0, proteinSum: 0, fatSum: 0 }
    );
  }

  const sum = calculateSum(mealData);

  function makeNewMealsArray(mealsArray) {
    const newArray =
      mealsArray.length <= 3
        ? [
            ...mealsArray,
            ...Array(1).fill({
              showButton: true,
            }),
            ...Array(3 - mealsArray.length).fill({
              foodName: '',
              carbonohidrates: '',
              fat: '',
              protein: '',
            }),
          ]
        : [
            ...mealsArray,
            ...Array(1).fill({
              showButton: true,
            }),
          ];
    return newArray;
  }

  const onEditButtonClick = name => {
    document.body.style.overflow = 'hidden';

    setFoodName(name);
    onUpdateMealButtonClick(mealType);
  };
  const [mealModalOpen, setMealModalOpen] = useState(false);
  const [selectedFoodName, setSelectedFoodName] = useState('');

  // const { items } = useSelector(selectGoals);
  // if (Object.keys(items).length === 0) {
  //   return;
  // }

  // const breakfastCalories = items.breakfast.calories;
  // const breakfastCarbohydrates = items.breakfast.carbohydrates;
  // const breakfastProtein = items.breakfast.protein;
  // const breakfastFat = items.breakfast.fat;

  // const lunchCalories = items.lunch.calories;
  // const lunchCarbohydrates = items.lunch.carbohydrates;
  // const lunchProtein = items.lunch.protein;
  // const lunchFat = items.lunch.fat;

  // const dinnerCalories = items.dinner.calories;
  // const dinnerCarbohydrates = items.dinner.carbohydrates;
  // const dinnerProtein = items.dinner.protein;
  // const dinnerFat = items.dinner.fat;

  // const snackCalories = items.snack.calories;
  // const snackCarbohydrates = items.snack.carbohydrates;
  // const snackProtein = items.snack.protein;
  // const snackFat = items.snack.fat;

  const onRecordMealButtonClick = evt => {
    setSelectedFoodName(evt.target.name);
    document.body.style.overflow = 'hidden';
    setMealModalOpen(true);
  };

  return (
    <>
      <div className={s.targetMeal}>
        <div className={s.mealTypeWrapper}>
          <div className={s.mealTitleWrapper}>
            <img width="36px" height="36px" src={mob[mealType]} alt="meal" />

            <h3 className={s.mealListItemTitle}>{mealType}</h3>
          </div>

          <div className={s.descriptionWrap}>
            <p className={s.mealAdditionalInfoDescription}>
              Carbonohidrates:
              <span className={s.mealAdditionalInfoValue}>
                {sum.carbonohidratesSum}
              </span>
            </p>

            <p className={s.mealAdditionalInfoDescription}>
              Protein:
              <span className={s.mealAdditionalInfoValue}>
                {sum.proteinSum}
              </span>
            </p>

            <p className={s.mealAdditionalInfoDescription}>
              Fat:
              <span className={s.mealAdditionalInfoValue}>{sum.fatSum}</span>
            </p>
          </div>
        </div>

        <ol className={`${s.table}  ${s.sideBarBox}`}>
          {makeNewMealsArray(mealData).map(el => {
            return !el.showButton ? (
              <li key={nanoid()} className={s.mealItem}>
                <div className={s.mealWrap}>
                  <div className={s.mealNameWrap}>
                    <p className={s.foodName}>{el.foodName}</p>
                    {el.foodName && isMobile && (
                      <button
                        className={s.btnEdit}
                        onClick={() => onEditButtonClick(el.foodName)}
                      >
                        <svg
                          width="16px"
                          height="16px"
                          className={s.recordMealIcon}
                        >
                          <use xlinkHref={`${Icons}#pencil`} />
                        </svg>
                        Edit
                      </button>
                    )}
                  </div>

                  <div className={s.mealNutritionalWrap}>
                    {Object.keys(el)
                      .slice(1)
                      .map(
                        key =>
                          el.foodName && (
                            <p key={key} className={s.numWrap}>
                              {isMobile ? (
                                <span>
                                  <span className={s.colorNut}>
                                    {key.slice(0, 1).toUpperCase()}
                                    {key.slice(1, 4)}.:
                                  </span>
                                  &nbsp;{el[key]}
                                </span>
                              ) : (
                                el[key]
                              )}
                            </p>
                          )
                      )}

                    {el.foodName && !isMobile && (
                      <button
                        onClick={() => onEditButtonClick(el.foodName)}
                        className={s.btnEdit}
                      >
                        <svg
                          width="16px"
                          height="16px"
                          className={s.recordMealIcon}
                        >
                          <use xlinkHref={`${Icons}#pencil`} />
                        </svg>
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ) : (
              <li key={nanoid()} className={s.mealItem}>
                <button
                  name={mealType}
                  onClick={onRecordMealButtonClick}
                  className={s.recordMealButton}
                >
                  <svg width="16px" height="16px" className={s.recordMealIcon}>
                    <use xlinkHref={`${Icons}#add`} />
                  </svg>
                  Record your meal
                </button>
                <MealModal
                  isOpen={mealModalOpen}
                  onClose={() => setMealModalOpen(false)}
                  mealName={selectedFoodName}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default DiaryTable;
